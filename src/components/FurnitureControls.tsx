import { useEffect, useRef } from 'react'
import { TransformControls } from '@react-three/drei'
import { Object3D } from 'three'
import { useStore } from '../store/useStore'

interface FurnitureControlsProps {
  target: Object3D
}

export function FurnitureControls({ target }: FurnitureControlsProps) {
  const transformRef = useRef<any>(null)
  
  const transformMode = useStore((state) => state.transformMode)
  const snapRotation = useStore((state) => state.snapRotation)

  useEffect(() => {
    const controls = transformRef.current
    if (!controls) return

    const handleDrag = () => {
      // Lock Y position for translate mode (keep furniture on floor)
      if (transformMode === 'translate' && target.userData.originalY !== undefined) {
        target.position.y = target.userData.originalY
      }
    }

    controls.addEventListener('change', handleDrag)
    return () => controls.removeEventListener('change', handleDrag)
  }, [target, transformMode])

  // Rotation snap angle (15 degrees in radians)
  const rotationSnap = snapRotation ? Math.PI / 12 : undefined

  return (
    <TransformControls
      ref={transformRef}
      object={target}
      mode={transformMode}
      rotationSnap={rotationSnap}
      showX={transformMode === 'translate' || transformMode === 'rotate'}
      showY={transformMode === 'rotate'}
      showZ={transformMode === 'translate' || transformMode === 'rotate'}
      size={0.8}
    />
  )
}
