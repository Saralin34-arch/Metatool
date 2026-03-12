import { forwardRef } from 'react'

export const DepthEstimationPage = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className="depth-section">
      <div className="depth-content">
        <header className="depth-header">
          <h2>Depth Estimation Experiments</h2>
          <p>
            Exploring spatial perception through machine learning depth estimation techniques
          </p>
        </header>

        {/* Experiment Gallery */}
        <div className="depth-gallery">
          <div className="depth-card">
            <div className="depth-image-placeholder">
              <span>Experiment 1</span>
              <p>Add your depth estimation image here</p>
            </div>
            <div className="depth-card-info">
              <h3>Depth Map Analysis</h3>
              <p>Description of your experiment...</p>
            </div>
          </div>

          <div className="depth-card">
            <div className="depth-image-placeholder">
              <span>Experiment 2</span>
              <p>Add your depth estimation image here</p>
            </div>
            <div className="depth-card-info">
              <h3>Spatial Reconstruction</h3>
              <p>Description of your experiment...</p>
            </div>
          </div>

          <div className="depth-card">
            <div className="depth-image-placeholder">
              <span>Experiment 3</span>
              <p>Add your depth estimation image here</p>
            </div>
            <div className="depth-card-info">
              <h3>Point Cloud Generation</h3>
              <p>Description of your experiment...</p>
            </div>
          </div>

          <div className="depth-card">
            <div className="depth-image-placeholder">
              <span>Experiment 4</span>
              <p>Add your depth estimation image here</p>
            </div>
            <div className="depth-card-info">
              <h3>Monocular Depth</h3>
              <p>Description of your experiment...</p>
            </div>
          </div>
        </div>

        {/* Methodology Section */}
        <div className="depth-methodology">
          <h3>Methodology</h3>
          <div className="methodology-content">
            <div className="methodology-text">
              <p>
                Add information about your machine learning depth estimation approach, 
                the models used, training data, and key findings from your experiments.
              </p>
              <p>
                This section can include technical details about the algorithms, 
                comparison between different methods, and insights gained from the analysis.
              </p>
            </div>
            <div className="methodology-placeholder">
              <span>Diagram / Workflow</span>
              <p>Add methodology diagram</p>
            </div>
          </div>
        </div>

        {/* Back to top */}
        <div className="depth-footer">
          <button 
            className="back-to-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ↑ Back to Top
          </button>
        </div>
      </div>
    </section>
  )
})

DepthEstimationPage.displayName = 'DepthEstimationPage'
