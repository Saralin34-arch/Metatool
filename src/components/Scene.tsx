import { useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { RoomModel } from './RoomModel'
import { useStore } from '../store/useStore'

export function Scene() {
  const setSelectedObject = useStore((state) => state.setSelectedObject)
  const { gl } = useThree()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedObject(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setSelectedObject])

  useEffect(() => {
    gl.domElement.style.touchAction = 'none'
  }, [gl])

  return (
    <>
      {/* Simple ambient lighting for wireframe view */}
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      
      <RoomModel />
      
      {/* Full rotation enabled - no angle restrictions */}
      <OrbitControls 
        makeDefault 
        enableDamping
        dampingFactor={0.05}
        minDistance={1}
        maxDistance={20}
      />
    </>
  )
}
