import { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { Mesh, LineBasicMaterial, EdgesGeometry, LineSegments, Box3, Vector3 } from 'three'

export function TopViewScene() {
  const { scene } = useGLTF('/My Room.glb')

  useEffect(() => {
    const lineMaterial = new LineBasicMaterial({ color: 0x333333, linewidth: 1 })
    
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        // Check if this is a ceiling (skip it for floor plan view)
        const name = child.name.toLowerCase()
        if (name.includes('ceiling') || name.includes('roof')) {
          child.visible = false
          return
        }
        
        // Create edge geometry
        const edges = new EdgesGeometry(child.geometry, 15)
        const line = new LineSegments(edges, lineMaterial)
        
        // Only add if not already added
        if (!child.userData.hasTopViewEdges) {
          child.add(line)
          child.userData.hasTopViewEdges = true
        }
        
        // Arctic view style with 80% opacity
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              mat.transparent = true
              mat.opacity = 0.8
              mat.color?.setHex(0xfafafa)
            })
          } else {
            child.material.transparent = true
            child.material.opacity = 0.8
            child.material.color?.setHex(0xfafafa)
          }
        }
      }
    })

    // Center and scale
    const box = new Box3().setFromObject(scene)
    const center = box.getCenter(new Vector3())
    const size = box.getSize(new Vector3())
    
    const maxDim = Math.max(size.x, size.z)
    const scale = 4 / maxDim
    
    scene.scale.setScalar(scale)
    scene.position.x = -center.x * scale
    scene.position.z = -center.z * scale
    scene.position.y = -center.y * scale
  }, [scene])

  return (
    <>
      <ambientLight intensity={1} />
      <primitive object={scene.clone()} />
    </>
  )
}

useGLTF.preload('/My Room.glb')
