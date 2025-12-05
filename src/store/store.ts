import { configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import uiReducer from './slices/uiSlice'

// Importa tus slices aquí
// import exampleReducer from './slices/exampleSlice';

export const store = configureStore({
  reducer: {
    // example: exampleReducer,
    ui: uiReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Hooks tipados para usar en componentes
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
