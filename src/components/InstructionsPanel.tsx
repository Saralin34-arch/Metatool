export function InstructionsPanel() {
  return (
    <div className="instructions-panel">
      <h2>Spatial Comfort Lab</h2>
      <p>
        Explore how furniture arrangement affects your sense of comfort in a space. 
        Navigate the room and rate how the layout makes you feel.
      </p>
      
      <ul className="instructions-list">
        <li>
          <span className="instruction-icon">1</span>
          <span><strong>Navigate</strong> — Drag to rotate the camera view around the room</span>
        </li>
        <li>
          <span className="instruction-icon">2</span>
          <span><strong>Zoom</strong> — Scroll to zoom in and out of the space</span>
        </li>
        <li>
          <span className="instruction-icon">3</span>
          <span><strong>Pan</strong> — Right-click and drag to pan the view</span>
        </li>
        <li>
          <span className="instruction-icon">4</span>
          <span><strong>Select</strong> — Click on furniture to select and move it</span>
        </li>
        <li>
          <span className="instruction-icon">5</span>
          <span><strong>Save</strong> — When satisfied, click Save Layout to submit your feedback</span>
        </li>
      </ul>
    </div>
  )
}
