import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { LayoutData } from '../types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase: SupabaseClient | null = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export async function saveLayout(data: LayoutData): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    console.warn('Supabase not configured. Layout data:', data)
    console.log('To enable saving, add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env')
    return { 
      success: false, 
      error: 'Backend not configured. Check console for layout data.' 
    }
  }

  try {
    const { error } = await supabase
      .from('layouts')
      .insert({
        layout_id: data.layoutId,
        timestamp: data.timestamp,
        objects: data.objects,
        lighting: data.lighting,
        survey: data.survey,
      })

    if (error) {
      console.error('Supabase error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Save layout error:', err)
    return { success: false, error: 'Failed to save layout' }
  }
}
