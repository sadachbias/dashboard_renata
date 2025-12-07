import { Route, Routes } from 'react-router'
import MainLayout from './components/layouts/MainLayout'
import Login from './pages/auth/Login'
import Charts from './pages/Charts'
import Dashboard from './pages/Dashboard'
import Messages from './pages/Messages'
import Reports from './pages/Reports'
import Users from './pages/Users'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="charts" element={<Charts />} />
        <Route path="mensajes" element={<Messages />} />
        <Route path="reportes" element={<Reports />} />
        <Route path="usuarios" element={<Users />} />

        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default AppRoutes
