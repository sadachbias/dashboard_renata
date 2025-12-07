import React, { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { ChartArea, ChevronRight, LayoutDashboard, MessageCircle, Users } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'

interface AdminSidebarProps {
  isOpen: boolean
  onToggle?: () => void
}

interface MenuItem {
  label: string
  icon: React.ReactNode
  href?: string
  submenu?: {
    label: string
    href: string
    icon?: React.ReactNode
  }[]
  allowedRoles?: string[]
}

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: '/dashboard'
  },
  //   {
  //     label: 'Catálogo',
  //     icon: <Combine className='w-5 h-5' />,
  //     submenu: [
  //       { label: 'Categorías', href: '/admin/categorias', icon: <Layers className='w-4 h-4' /> },
  //       { label: 'Marcas', href: '/admin/marcas', icon: <ScanBarcode className='w-4 h-4' /> },
  //       { label: 'Productos', href: '/admin/productos', icon: <Package className='w-4 h-4' /> },
  //       { label: 'Promociones', href: '/admin/promociones', icon: <CirclePercent className='w-4 h-4' /> }
  //     ]
  //   },

  {
    label: 'Usuarios',
    icon: <Users className="h-5 w-5" />,
    href: '/usuarios',
    allowedRoles: ['admin']
  },
  //   {
  //     label: 'Mensajes',
  //     icon: <MessageSquare className='w-5 h-5' />,
  //     href: '/admin/mensajes'
  //   },
  {
    label: 'Mensajes ',
    icon: <MessageCircle className="h-5 w-5" />,
    href: '/mensajes'
  },
  {
    label: 'Reportes ',
    icon: <ChartArea className="h-5 w-5" />,
    href: '/reports'
  }
  //   {
  //     label: 'Configuración',
  //     icon: <Settings className='w-5 h-5' />,
  //     submenu: [
  //       { label: 'Medios de Pago', href: '/admin/configuracion/medios-pago', icon: <CreditCard className='w-4 h-4' /> },
  //       { label: 'Zonas de Envío', href: '/admin/configuracion/zonas-envio', icon: <MapPinned className='w-4 h-4' /> },
  //       { label: 'Preguntas Frecuentes', href: '/admin/configuracion/preguntas-frecuentes', icon: <HelpCircle className='w-4 h-4' /> },
  //       { label: 'Datos de Contacto', href: '/admin/configuracion/datos-contacto', icon: <Phone className='w-4 h-4' /> },
  //       { label: 'Enlaces Útiles', href: '/admin/configuracion/enlaces', icon: <LinkIcon className='w-4 h-4' /> }
  //     ]
  //   }
]

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  //const { user } = useSelector((state: RootState) => state.auth)

  const toggleExpand = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label)
  }

  const matchBySegment = (base: string, path: string) => path === base || path.startsWith(base + '/')

  const isActive = (href: string) => {
    return href === '/admin' ? location.pathname === '/admin' : matchBySegment(href, location.pathname)
  }

  const isSubmenuActive = (submenu: { href: string }[]) => {
    return submenu.some((item) => isActive(item.href))
  }

  useEffect(() => {
    const activeParent = menuItems.find((mi) => mi.submenu && isSubmenuActive(mi.submenu))
    if (activeParent) setExpandedItem(activeParent.label)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  //if (!user) return null

  return (
    <aside
      className={`z-30 h-[calc(100vh-4rem)] bg-white shadow-sm transition-all duration-300 ${isOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'} `}
    >
      <nav className="p-4">
        <ul className="space-y-2">
          {/* Solo mostrar items permitidos por rol */}
          {menuItems
            //.filter((item) => !item.allowedRoles || item.allowedRoles.includes(user?.role))
            .map((item, index) => (
              <li key={index}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleExpand(item.label)}
                      className={`flex w-full cursor-pointer items-center gap-2 rounded px-4 py-2 transition-colors duration-200 ${isSubmenuActive(item.submenu) ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-100'} `}
                    >
                      {item.icon}
                      <span className="flex-1">{item.label}</span>
                      <motion.div animate={{ rotate: expandedItem === item.label ? 450 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronRight className="h-4 w-4" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {expandedItem === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2 ml-4 space-y-1">
                            {item.submenu.map((subItem, subIndex) => (
                              <button
                                key={subIndex}
                                onClick={() => navigate(subItem.href)}
                                className={`flex w-full cursor-pointer items-center gap-2 rounded px-4 py-2 transition-colors duration-200 ${isActive(subItem.href) ? 'bg-blue-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100'} `}
                              >
                                {subItem.icon}
                                <span>{subItem.label}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    onClick={() => navigate(item.href!)}
                    className={`flex w-full cursor-pointer items-center gap-2 rounded px-4 py-2 transition-colors duration-200 ${isActive(item.href!) ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-100'} `}
                  >
                    {item.icon}
                    {<span>{item.label}</span>}
                  </button>
                )}
              </li>
            ))}
        </ul>
      </nav>
    </aside>
  )
}

export default AdminSidebar
