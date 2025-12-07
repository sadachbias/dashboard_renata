import { Button, Tooltip } from '@heroui/react'
import { ChevronLeft } from 'lucide-react'
import { useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { useDeviceScreen } from '../../hooks/useDeviceScreen'
import Footer from '../common/Footer'
import Header from '../common/Header'
import Sidebar from '../common/Sidebar'

const MainLayout = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  const { isDesktop } = useDeviceScreen()
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024)
  const location = useLocation()
  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      {/* DESKTOP LAYOUT */}
      {isDesktop && (
        <section className="flex h-[calc(100vh)] flex-row overflow-hidden bg-gray-100 pt-16 dark:bg-slate-950">
          {/* Sidebar en columna izquierda */}
          <div className={`relative shrink-0 transition-[width] duration-300 ${sidebarOpen ? 'w-64' : 'w-0'} `}>
            <Sidebar isOpen={sidebarOpen} />

            <Tooltip content={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'} placement="right">
              <Button
                isIconOnly
                className={`absolute bottom-1 z-40 transition-all duration-300 ${
                  sidebarOpen ? '-right-7' : '-right-11 rotate-180'
                } hover:opacity-100! data-[hover=true]:opacity-100`}
                onPress={() => setSidebarOpen((prev) => !prev)}
                aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
              >
                <ChevronLeft className={`h-5 w-5`} />
              </Button>
            </Tooltip>
          </div>

          {/* Contenido */}
          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
            <div ref={contentRef} className="flex-1 overflow-auto p-5">
              <div key={location.pathname + location.search} className="route-fade">
                <Outlet />
              </div>
            </div>
            <Footer />
          </div>
        </section>
      )}

      {/* MOBILE / TABLET LAYOUT */}
      {!isDesktop && (
        <section className="flex h-[calc(100vh)] flex-col overflow-hidden bg-gray-100 pt-16">
          {/* Contenido siempre a todo el ancho */}
          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
            <div ref={contentRef} className="flex-1 overflow-auto p-4">
              <div key={location.pathname + location.search} className="route-fade">
                <Outlet />
              </div>
            </div>
            <Footer />
          </div>

          {/* Sidebar como overlay */}
          <div
            className={`fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-64 bg-white shadow-xl transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} `}
          >
            <Sidebar isOpen={sidebarOpen} />
            <Button
              isIconOnly
              className={`absolute bottom-1 z-40 transition-all duration-300 ${sidebarOpen ? '-right-7' : '-right-11 rotate-180'}`}
              onPress={() => setSidebarOpen((prev) => !prev)}
              aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <ChevronLeft className={`h-5 w-5`} />
            </Button>
          </div>

          {/* Backdrop */}
          <div
            className={`fixed inset-0 top-16 z-40 bg-black/40 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'} `}
            onClick={() => setSidebarOpen(false)}
          />
        </section>
      )}
    </main>
  )
}

export default MainLayout
