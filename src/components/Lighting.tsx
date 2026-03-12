import { useStore } from '../store/useStore'

const PRESETS = {
  warm: { color: '#ffcc88', ambientColor: '#442200' },
  cool: { color: '#88ccff', ambientColor: '#002244' },
  natural: { color: '#ffffff', ambientColor: '#404040' },
}

export function Lighting() {
  const lighting = useStore((state) => state.lighting)
  const preset = PRESETS[lighting.preset]

  return (
    <>
      <ambientLight 
        color={preset.ambientColor} 
        intensity={lighting.intensity * 0.4} 
      />
      <directionalLight
        position={[5, 8, 5]}
        color={preset.color}
        intensity={lighting.intensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight
        position={[-3, 4, -3]}
        color={preset.color}
        intensity={lighting.intensity * 0.3}
      />
      <hemisphereLight
        color={preset.color}
        groundColor={preset.ambientColor}
        intensity={lighting.intensity * 0.2}
      />
    </>
  )
}
