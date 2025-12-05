import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { useDashboardInsights } from './hooks/useDashboardInsights'
import AppRoutes from './routes'

function App() {
  useDashboardInsights()
  return (
    <HeroUIProvider>
      <ToastProvider toastProps={{ classNames: { title: 'font-bold' } }} />

      <AppRoutes />
    </HeroUIProvider>
  )
}

export default App
