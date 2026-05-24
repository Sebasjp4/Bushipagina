import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HeroBanner from '../components/dashboard/HeroBanner'
import ToolGrid from '../components/dashboard/ToolGrid'
import Sidebar from '../components/dashboard/Sidebar'
import Eventos from '../components/dashboard/Eventos'
import MobileHeader from '../components/dashboard/MobileHeader'
import MobileNav from '../components/dashboard/MobileNav'

export default function Dashboard() {
  const navigate = useNavigate()
  const [usuarioBD, setUsuarioBD] = useState<any>(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargarDatos = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login', { replace: true })
        return
      }

      try {
        const res = await fetch('http://127.0.0.1:8000/atletas/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.ok) {
          setUsuarioBD(await res.json())
        } else {
          throw new Error('Sesión expirada')
        }
      } catch {
        localStorage.removeItem('token')
        navigate('/login', { replace: true })
      } finally {
        setCargando(false)
      }
    }
    cargarDatos()
  }, [navigate])

  if (cargando) {
    return (
      <div className="h-screen bg-[#111212] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-red-600 font-black tracking-[0.3em] uppercase animate-pulse">Bushi Kai</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#111212] text-white font-sans selection:bg-red-500/30 overflow-x-hidden">
      <div className="fixed inset-0 bg-textura opacity-20 pointer-events-none z-0" />

      <Sidebar usuario={usuarioBD} />
      <MobileHeader usuario={usuarioBD} />

      <main className="flex-1 md:ml-[260px] relative z-10">
        <div className="p-4 md:p-8 max-w-7xl mx-auto pb-32">
          <div className="flex flex-col xl:flex-row gap-8 items-start">
            <div className="flex-1 w-full space-y-6 md:space-y-10">
              <HeroBanner usuario={usuarioBD} />
              <div className="xl:hidden">
                <Eventos layout="slider" />
              </div>
              <ToolGrid />
            </div>
            <div className="hidden xl:block w-[320px] sticky top-8">
              <Eventos layout="sidebar" />
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
