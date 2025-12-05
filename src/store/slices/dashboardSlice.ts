import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Insights } from '../../schemas/insights.schema'

interface DashboardState {
  insights: Insights | null
  loading: boolean
  error: string | null
}

const initialState: DashboardState = {
  insights: null,
  loading: false,
  error: null
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setInsights: (state, action: PayloadAction<Insights | null>) => {
      state.insights = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    }
  }
})

export const { setInsights, setLoading, setError } = dashboardSlice.actions
export default dashboardSlice.reducer
