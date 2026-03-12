interface LandingPageProps {
  onScrollToLab: () => void
}

export function LandingPage({ onScrollToLab }: LandingPageProps) {
  return (
    <section className="landing-page">
      {/* Hero Section */}
      <header className="landing-hero">
        <h1>Spatial Comfort Lab</h1>
        <p className="hero-subtitle">
          An interactive exploration of spatial comfort and object arrangement
        </p>
      </header>

      {/* Main Content - Two Column Layout */}
      <div className="landing-main">
        {/* Left Column - Text Content */}
        <div className="landing-left">
          <div className="content-section">
            <h2>Project Background</h2>
            <p>
              In New York City, high rent and limited budgets often make it difficult for people 
              to live in their ideal spaces. Many residents have to compromise between different 
              spatial qualities. For example, they may sacrifice square footage to gain better 
              sunlight, or accept poorer lighting conditions in order to have a better layout or 
              a more convenient location. Because of these tradeoffs, people often end up living 
              in spaces that are not ideal, yet they still need to find ways to make these 
              environments comfortable and livable.
            </p>
          </div>

          <div className="content-section">
            <h2>Project Statement</h2>
            <p>
              This project explores how spatial arrangement and lighting conditions influence 
              people's emotional experience of a room. Through an interactive tool that allows 
              users to rearrange furniture and lighting within a digital model of a room, this 
              project investigates how different spatial configurations can produce different 
              feelings, atmospheres, and perceptions of comfort. The goal is to better understand 
              how spatial and lighting interactions shape human satisfaction within everyday 
              living environments.
            </p>
          </div>
        </div>

        {/* Right Column - Steps with Diagrams */}
        <div className="landing-right">
          <div className="step-item">
            <h3>STEP 1: OBSERVED</h3>
            <div className="step-diagrams">
              <div className="diagram-grid">
                <div className="diagram-box"><span>view 1</span></div>
                <div className="diagram-box"><span>view 2</span></div>
                <div className="diagram-box"><span>view 3</span></div>
                <div className="diagram-box"><span>view 4</span></div>
              </div>
            </div>
          </div>

          <div className="step-item">
            <h3>STEP 2: EXPERIMENT</h3>
            <div className="step-diagram-single">
              <div className="experiment-diagram">
                <div className="room-sketch"></div>
              </div>
            </div>
          </div>

          <div className="step-item">
            <h3>STEP 3: EXPLORE</h3>
            <div className="step-diagram-single">
              <div className="explore-diagram">
                <div className="floor-plan-sketch"></div>
                <div className="explore-labels">
                  <div className="label-group">
                    <span className="label-title">Room Brightness</span>
                    <span className="label-range">Lighter ↕ Darker</span>
                  </div>
                  <div className="label-group">
                    <span className="label-title">Size of Obstruction</span>
                    <span className="label-range">Larger ↕ Smaller</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Space Documentation */}
      <div className="space-documentation">
        <h2>Space Documentation</h2>
        <div className="space-photos">
          <img src="/space-photo-1.jpg" alt="Room view 1" />
          <img src="/space-photo-2.jpg" alt="Room view 2" />
          <img src="/space-photo-3.jpg" alt="Room view 3" />
        </div>
      </div>

      {/* Call to Action */}
      <div className="landing-cta">
        <button className="cta-button" onClick={onScrollToLab}>
          Enter the Lab
          <span className="cta-arrow">↓</span>
        </button>
        <p className="scroll-hint">Scroll to continue</p>
        <span className="scroll-arrow-small">↓</span>
      </div>
    </section>
  )
}
