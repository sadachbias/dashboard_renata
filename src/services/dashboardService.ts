import supabase from '../lib/supabase'

export const dashboardService = {
  getDashboardData: async () => {
    // Simula una llamada a una API para obtener datos del dashboard
    const { data, error } = await supabase.from('dashboard_insights').select('*')
    if (error) {
      throw new Error(error.message)
    }
    return data[0] || null
  }
}
