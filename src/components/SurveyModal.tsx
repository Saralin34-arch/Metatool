import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useStore } from '../store/useStore'
import { saveLayout } from '../lib/supabase'
import type { SurveyData, FurnitureObject, LayoutData } from '../types'

const TAGS = [
  'Cozy', 'Modern', 'Minimalist', 'Cluttered', 'Open', 
  'Private', 'Functional', 'Aesthetic', 'Natural', 'Industrial'
]

const RATING_LABELS = [
  { key: 'comfort', label: 'Comfort' },
  { key: 'calm', label: 'Calm' },
  { key: 'spacious', label: 'Spacious' },
  { key: 'tidy', label: 'Tidy' },
  { key: 'delightful', label: 'Delightful' },
] as const

export function SurveyModal() {
  const setShowSurvey = useStore((state) => state.setShowSurvey)
  const furnitureObjects = useStore((state) => state.furnitureObjects)
  const lighting = useStore((state) => state.lighting)

  const [ratings, setRatings] = useState<Record<string, number>>({
    comfort: 0,
    calm: 0,
    spacious: 0,
    tidy: 0,
    delightful: 0,
  })
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [note, setNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleRatingClick = (key: string, value: number) => {
    setRatings((prev) => ({ ...prev, [key]: value }))
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const isValid = Object.values(ratings).every((r) => r > 0)

  const handleSubmit = async () => {
    if (!isValid) {
      setError('Please rate all categories')
      return
    }

    setIsSubmitting(true)
    setError(null)

    // Collect furniture positions
    const objects: FurnitureObject[] = []
    furnitureObjects.forEach((obj, name) => {
      objects.push({
        name,
        position: [obj.position.x, obj.position.y, obj.position.z],
        rotation: [obj.rotation.x, obj.rotation.y, obj.rotation.z],
        scale: [obj.scale.x, obj.scale.y, obj.scale.z],
      })
    })

    const survey: SurveyData = {
      comfort: ratings.comfort,
      calm: ratings.calm,
      spacious: ratings.spacious,
      tidy: ratings.tidy,
      delightful: ratings.delightful,
      tags: selectedTags,
      note,
    }

    const layoutData: LayoutData = {
      layoutId: uuidv4(),
      timestamp: Date.now(),
      objects,
      lighting: { ...lighting },
      survey,
    }

    const result = await saveLayout(layoutData)

    setIsSubmitting(false)

    if (result.success) {
      setSuccess(true)
      setTimeout(() => {
        setShowSurvey(false)
      }, 1500)
    } else {
      setError(result.error || 'Failed to save. Please try again.')
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setShowSurvey(false)
    }
  }

  if (success) {
    return (
      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h2>Layout Saved!</h2>
          <p style={{ color: '#10b981', marginTop: 12 }}>
            Thank you for your feedback.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Save Layout</h2>
        <p className="modal-subtitle">
          Rate how this room arrangement makes you feel (1-7)
        </p>

        {/* Ratings */}
        {RATING_LABELS.map(({ key, label }) => (
          <div key={key} className="rating-group">
            <label>{label}</label>
            <div className="rating-buttons">
              {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <button
                  key={value}
                  className={`rating-btn ${ratings[key] === value ? 'selected' : ''}`}
                  onClick={() => handleRatingClick(key, value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Tags */}
        <div className="tags-group">
          <label>Tags (optional)</label>
          <div className="tags-container">
            {TAGS.map((tag) => (
              <button
                key={tag}
                className={`tag-btn ${selectedTags.includes(tag) ? 'selected' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="note-group">
          <label>Notes (optional)</label>
          <textarea
            className="note-input"
            placeholder="Any additional thoughts about this layout..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: 16 }}>
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="modal-actions">
          <button
            className="btn btn-secondary"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            className="btn btn-success"
            onClick={handleSubmit}
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? 'Saving...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  )
}
