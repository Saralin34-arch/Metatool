import { Object3D } from 'three'

export interface FurnitureObject {
  name: string
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
}

export interface LightingConfig {
  preset: 'warm' | 'cool' | 'natural'
  intensity: number
}

export interface SurveyData {
  comfort: number
  calm: number
  spacious: number
  tidy: number
  delightful: number
  tags: string[]
  note: string
}

export interface LayoutData {
  layoutId: string
  timestamp: number
  objects: FurnitureObject[]
  lighting: LightingConfig
  survey: SurveyData
}

export type TransformMode = 'translate' | 'rotate'

export interface AppState {
  selectedObject: Object3D | null
  transformMode: TransformMode
  snapRotation: boolean
  lighting: LightingConfig
  furnitureObjects: Map<string, Object3D>
  showSurvey: boolean
  
  setSelectedObject: (obj: Object3D | null) => void
  setTransformMode: (mode: TransformMode) => void
  toggleSnapRotation: () => void
  setLightingPreset: (preset: LightingConfig['preset']) => void
  setLightingIntensity: (intensity: number) => void
  registerFurniture: (name: string, obj: Object3D) => void
  setShowSurvey: (show: boolean) => void
}
