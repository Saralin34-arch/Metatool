import { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { Group, Object3D, Mesh, Box3, Vector3, LineBasicMaterial, EdgesGeometry, LineSegments } from 'three'
import { FurnitureControls } from './FurnitureControls'
import { useStore } from '../store/useStore'

// Keywords to identify FURNITURE objects (separate from room structure)
// Only objects with these keywords will be movable
const FURNITURE_KEYWORDS = [
  'chair', 'table', 'sofa', 'couch', 'desk', 'bed', 'lamp', 'shelf', 
  'cabinet', 'drawer', 'wardrobe', 'bookshelf', 'armchair', 'ottoman',
  'bench', 'stool', 'nightstand', 'dresser', 'tv', 'plant', 'rug',
  'cushion', 'pillow', 'mirror', 'clock', 'vase', 'frame', 'picture',
  'furniture' // Generic tag for imported furniture
]

function isFurniture(name: string): boolean {
  const lowerName = name.toLowerCase()
  return FURNITURE_KEYWORDS.some(keyword => lowerName.includes(keyword))
}

export function RoomModel() {
  const { scene } = useGLTF('/My Room.glb')
  const groupRef = useRef<Group>(null)
  const { camera } = useThree()
  
  const selectedObject = useStore((state) => state.selectedObject)
  const setSelectedObject = useStore((state) => state.setSelectedObject)
  const registerFurniture = useStore((state) => state.registerFurniture)

  useEffect(() => {
    const lineMaterial = new LineBasicMaterial({ color: 0x333333, linewidth: 1 })
    
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        // Create edge geometry for clean line look
        const edges = new EdgesGeometry(child.geometry, 15)
        const line = new LineSegments(edges, lineMaterial)
        child.add(line)
        
        // Arctic view style - white surfaces with 80% opacity
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
        
        child.castShadow = false
        child.receiveShadow = false
      }
      
      // ONLY mark objects as furniture if they explicitly have furniture keywords
      // Room structure (walls, floor, ceiling) should NOT be movable
      if (child.name && isFurniture(child.name)) {
        registerFurniture(child.name, child)
        child.userData.isFurniture = true
        child.userData.originalY = child.position.y
      }
    })

    // Center and scale the model
    const box = new Box3().setFromObject(scene)
    const center = box.getCenter(new Vector3())
    const size = box.getSize(new Vector3())
    
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 4 / maxDim
    
    scene.scale.setScalar(scale)
    scene.position.sub(center.multiplyScalar(scale))
    scene.position.y = 0
    
    // Position camera based on model size
    camera.position.set(size.x * scale, size.y * scale * 1.5, size.z * scale * 1.5)
    camera.lookAt(0, 0, 0)
  }, [scene, camera, registerFurniture])

  const handleClick = (event: any) => {
    event.stopPropagation()
    
    let target = event.object as Object3D
    
    // Walk up the tree to find a furniture parent
    while (target && !target.userData.isFurniture && target.parent) {
      target = target.parent
    }
    
    // Only select if it's explicitly marked as furniture
    if (target?.userData.isFurniture) {
      setSelectedObject(target)
    }
  }

  const handleMissed = () => {
    setSelectedObject(null)
  }

  return (
    <group ref={groupRef}>
      <primitive 
        object={scene} 
        onClick={handleClick}
        onPointerMissed={handleMissed}
      />
      {selectedObject && (
        <FurnitureControls target={selectedObject} />
      )}
    </group>
  )
}

useGLTF.preload('/My Room.glb')
