import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scene } from './components/Scene'
import { TopViewScene } from './components/TopViewScene'
import { ControlPanel } from './components/ControlPanel'
import { SurveyModal } from './components/SurveyModal'
import { InstructionsPanel } from './components/InstructionsPanel'
import { LandingPage } from './components/LandingPage'
import { DepthEstimationPage } from './components/DepthEstimationPage'
import { ScrollIndicator } from './components/ScrollIndicator'
import { Loader } from './components/Loader'
import { useStore } from './store/useStore'

export default function App() {
  const showSurvey = useStore((state) => state.showSurvey)
  const labSectionRef = useRef<HTMLElement>(null)
  const depthSectionRef = useRef<HTMLElement>(null)

  const scrollToLab = () => {
    labSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToDepth = () => {
    depthSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="scroll-container">
      {/* Vertical Scroll Indicator */}
      <ScrollIndicator totalSections={3} />
      {/* Page 1: Landing / Introduction */}
      <LandingPage onScrollToLab={scrollToLab} />

      {/* Page 2: Spatial Comfort Lab */}
      <section ref={labSectionRef} className="lab-section">
        <div className="app-container">
          {/* Left Side Panel - Instructions */}
          <div className="side-panel side-panel-left">
            <InstructionsPanel />
            
            <div className="topview-panel">
              <h3>Floor Plan (Top View)</h3>
              <div className="topview-canvas">
                <Canvas
                  orthographic
                  camera={{ position: [0, 10, 0], zoom: 40, up: [0, 0, -1] }}
                  gl={{ antialias: true }}
                  style={{ background: 'white' }}
                >
                  <Suspense fallback={null}>
                    <TopViewScene />
                  </Suspense>
                </Canvas>
              </div>
            </div>
          </div>

          {/* Main 3D View */}
          <div className="main-view">
            <div className="canvas-container">
              <Canvas
                camera={{ position: [5, 5, 5], fov: 50 }}
                gl={{ antialias: true }}
                style={{ background: '#F6F5F6' }}
              >
                <Suspense fallback={null}>
                  <Scene />
                </Suspense>
              </Canvas>
              <Loader />
            </div>
            
            <div className="info-overlay">
              <kbd>Drag</kbd> to rotate view · <kbd>Scroll</kbd> to zoom · <kbd>Right-drag</kbd> to pan
            </div>

            {/* Next page indicator */}
            <button className="next-section-btn" onClick={scrollToDepth}>
              View Depth Estimation ↓
            </button>
          </div>

          {/* Right Side Panel - Controls */}
          <div className="side-panel side-panel-right">
            <ControlPanel />
          </div>
        </div>
      </section>

      {/* Page 3: Depth Estimation Experiments */}
      <DepthEstimationPage ref={depthSectionRef} />
      
      {showSurvey && <SurveyModal />}
    </div>
  )
}
