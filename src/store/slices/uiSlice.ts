import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  sidebarOpen: boolean
  loading: boolean
  error: string | null
  notification: {
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
  } | null
}

const initialState: UIState = {
  sidebarOpen: true,
  loading: false,
  error: null,
  notification: null
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setNotification: (state, action: PayloadAction<UIState['notification']>) => {
      state.notification = action.payload
    },
    clearNotification: (state) => {
      state.notification = null
    }
  }
})

export const { toggleSidebar, setLoading, setError, setNotification, clearNotification } = uiSlice.actions

export default uiSlice.reducer
