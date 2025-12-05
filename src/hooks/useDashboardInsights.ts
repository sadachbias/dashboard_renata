import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import supabase from '../lib/supabase'
import { dashboardService } from '../services/dashboardService'
import { setInsights } from '../store/slices/dashboardSlice'

export const useDashboardInsights = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // Carga inicial
    const fetchDashboardInsights = async () => {
      const data = await dashboardService.getDashboardData()

      if (data) dispatch(setInsights(data))
      //if (error) console.error('Error al cargar categorías:', error.message)
    }

    fetchDashboardInsights()

    // Realtime
    const channel = supabase
      .channel('realtime:Insights')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'whatsapp_campaign_test' }, async () => {
        console.log('Cambios detectados')

        await fetchDashboardInsights() // <-- recarga todo desde la view
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [dispatch])
}
