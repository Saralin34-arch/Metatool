import { useEffect, useState } from 'react'

interface ScrollIndicatorProps {
  totalSections: number
}

export function ScrollIndicator({ totalSections }: ScrollIndicatorProps) {
  const [activeSection, setActiveSection] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const container = document.querySelector('.scroll-container')
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight - container.clientHeight
      const progress = scrollTop / scrollHeight
      
      setScrollProgress(progress)
      
      const sectionHeight = container.scrollHeight / totalSections
      const currentSection = Math.floor(scrollTop / sectionHeight)
      setActiveSection(Math.min(currentSection, totalSections - 1))
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [totalSections])

  const scrollToSection = (index: number) => {
    const container = document.querySelector('.scroll-container')
    if (!container) return
    
    const sectionHeight = container.scrollHeight / totalSections
    container.scrollTo({
      top: sectionHeight * index,
      behavior: 'smooth'
    })
  }

  return (
    <div className="scroll-indicator-vertical">
      {/* Top bracket */}
      <div className="bracket bracket-top">
        <svg viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 8 L10 2 L18 8" />
        </svg>
      </div>

      {/* Track */}
      <div className="scroll-track">
        <div 
          className="scroll-thumb"
          style={{ 
            top: `${scrollProgress * 70}%`
          }}
        />
      </div>

      {/* Section dots */}
      <div className="section-dots">
        {Array.from({ length: totalSections }).map((_, index) => (
          <button
            key={index}
            className={`section-dot ${activeSection === index ? 'active' : ''}`}
            onClick={() => scrollToSection(index)}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom bracket */}
      <div className="bracket bracket-bottom">
        <svg viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 2 L10 8 L18 2" />
        </svg>
      </div>
    </div>
  )
}
