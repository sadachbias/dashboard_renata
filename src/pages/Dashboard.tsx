import { Card } from '@heroui/react'
import { useState } from 'react'
import { useAppSelector } from '../store/store'

const Dashboard = () => {
  const [count, setCount] = useState(0)

  const { insights } = useAppSelector((state) => state.dashboard)

  //const InsightsData = dashboardService.getDashboardData()

  return (
    <div>
      <section className='grid grid-cols-4 gap-4'>
        <Card className='p-4 bg-gradient-to-br from-blue-50 to-blue-100'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600'>Contactos</p>
              <p className='text-3xl font-bold text-blue-600'>{insights?.total_phones}</p>
            </div>
            <span className='text-4xl'>📱</span>
          </div>
        </Card>
        <Card className='p-4 bg-gradient-to-br from-blue-50 to-blue-100'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600'>Mensajes enviados</p>
              <p className='text-3xl font-bold text-blue-600'>{insights?.total_messages_sent}</p>
            </div>
            <span className='text-4xl'>📱</span>
          </div>
        </Card>
        <Card className='p-4 bg-gradient-to-br from-green-50 to-green-100'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600'>Interactuaron</p>
              <p className='text-3xl font-bold text-green-600'>{insights?.total_interacted}</p>
            </div>
            <span className='text-4xl'>💬</span>
          </div>
        </Card>
        <Card className='p-4 bg-gradient-to-br from-purple-50 to-purple-100'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600'>FYI</p>
              <p className='text-3xl font-bold text-purple-600'>{insights?.total_fyi1_sent}</p>
            </div>
            <span className='text-4xl'>ℹ️</span>
          </div>
        </Card>
        <Card className='p-4 bg-gradient-to-br from-orange-50 to-orange-100'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600'>Con cita</p>
              <p className='text-3xl font-bold text-orange-600'>{insights?.schedule_leads}</p>
            </div>
            <span className='text-4xl'>📅</span>
          </div>
        </Card>
      </section>

      <h1 className='text-4xl font-bold'>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </div>
  )
}

export default Dashboard
