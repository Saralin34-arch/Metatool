import { create } from 'zustand'
import { Object3D } from 'three'
import { AppState, TransformMode, LightingConfig } from '../types'

export const useStore = create<AppState>((set) => ({
  selectedObject: null,
  transformMode: 'translate',
  snapRotation: false,
  lighting: {
    preset: 'natural',
    intensity: 1.0,
  },
  furnitureObjects: new Map(),
  showSurvey: false,

  setSelectedObject: (obj: Object3D | null) => set({ selectedObject: obj }),
  
  setTransformMode: (mode: TransformMode) => set({ transformMode: mode }),
  
  toggleSnapRotation: () => set((state) => ({ snapRotation: !state.snapRotation })),
  
  setLightingPreset: (preset: LightingConfig['preset']) =>
    set((state) => ({ lighting: { ...state.lighting, preset } })),
  
  setLightingIntensity: (intensity: number) =>
    set((state) => ({ lighting: { ...state.lighting, intensity } })),
  
  registerFurniture: (name: string, obj: Object3D) =>
    set((state) => {
      const newMap = new Map(state.furnitureObjects)
      newMap.set(name, obj)
      return { furnitureObjects: newMap }
    }),
  
  setShowSurvey: (show: boolean) => set({ showSurvey: show }),
}))
