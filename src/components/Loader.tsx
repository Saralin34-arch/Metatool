import { useProgress } from '@react-three/drei'

export function Loader() {
  const { progress, active } = useProgress()
  
  if (!active) return null
  
  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <div className="loader-spinner"></div>
        <p>Loading room... {Math.round(progress)}%</p>
      </div>
    </div>
  )
}
