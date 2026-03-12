import { useStore } from '../store/useStore'
import type { TransformMode } from '../types'

export function ControlPanel() {
  const selectedObject = useStore((state) => state.selectedObject)
  const transformMode = useStore((state) => state.transformMode)
  const snapRotation = useStore((state) => state.snapRotation)
  
  const setTransformMode = useStore((state) => state.setTransformMode)
  const toggleSnapRotation = useStore((state) => state.toggleSnapRotation)
  const setShowSurvey = useStore((state) => state.setShowSurvey)

  return (
    <div className="control-panel">
      <h2>Controls</h2>

      {/* Selection Info */}
      <div className="control-section">
        <h3>Selected Object</h3>
        {selectedObject ? (
          <div className="selection-info">
            <span>{selectedObject.name || 'Unnamed Object'}</span>
          </div>
        ) : (
          <div className="selection-info">
            <span style={{ color: 'var(--grey)' }}>Click furniture to select</span>
          </div>
        )}
      </div>

      {/* Transform Mode */}
      <div className="control-section">
        <h3>Transform Mode</h3>
        <div className="button-group">
          {(['translate', 'rotate'] as TransformMode[]).map((mode) => (
            <button
              key={mode}
              className={`btn btn-secondary ${transformMode === mode ? 'active' : ''}`}
              onClick={() => setTransformMode(mode)}
            >
              {mode === 'translate' ? 'Move' : 'Rotate'}
            </button>
          ))}
        </div>
      </div>

      {/* Snap Rotation Toggle */}
      <div className="control-section">
        <div className="toggle-row">
          <label>Snap Rotation (15°)</label>
          <label className="toggle">
            <input
              type="checkbox"
              checked={snapRotation}
              onChange={toggleSnapRotation}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      {/* Save Layout Button */}
      <div className="control-section">
        <button
          className="btn btn-success"
          style={{ width: '100%' }}
          onClick={() => setShowSurvey(true)}
        >
          Save Layout
        </button>
      </div>
    </div>
  )
}
