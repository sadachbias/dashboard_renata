import { HeroUIProvider, ToastProvider } from '@heroui/react'
import AppRoutes from './routes'

function App() {
  return (
    <HeroUIProvider>
      <ToastProvider toastProps={{ classNames: { title: 'font-bold' } }} />

      <AppRoutes />
    </HeroUIProvider>
  )
}

export default App
