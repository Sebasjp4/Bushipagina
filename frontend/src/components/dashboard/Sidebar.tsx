import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Calendar, Trophy, Zap, Timer, Dices, Plane, LogOut } from 'lucide-react'

interface SidebarProps {
  usuario: {
    nombre: string
    grado_cinturon: string
  }
}

export default function Sidebar({ usuario }: SidebarProps) {
  const navigate = useNavigate()

  const navPrincipal = [
    { label: 'Dashboard', icon: LayoutDashboard, active: true },
    { label: 'Calendario', icon: Calendar, active: false },
    { label: 'Mis PRs', icon: Trophy, active: false },
    { label: 'Microciclos', icon: Zap, active: false },
  ]

  const navTatami = [
    { label: 'Cronómetro WKF', icon: Timer, active: false },
    { label: 'Ruleta del Caos', icon: Dices, active: false },
    { label: 'Calculadora Viajes', icon: Plane, active: false },
  ]

  const iniciales = usuario.nombre
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login', { replace: true })
  }

  return (
    <aside className="hidden md:flex flex-col w-[260px] bg-[#1A1B1B] border-r border-[var(--color-borde)] fixed top-0 left-0 bottom-0 z-50">
      <div className="flex items-center gap-3 p-6 border-b border-[var(--color-borde)] mb-4">
        <img src="/img/Isotipo.png" alt="Bushi Kai Logo" className="w-10 h-10 object-contain flex-shrink-0" />
        <div className="flex flex-col justify-center">
          <h1 className="font-['Montserrat'] font-black text-xl tracking-tighter text-white leading-none uppercase">
            BUSHIKAI
          </h1>
          <p className="text-[9px] font-black tracking-[0.3em] text-red-600 uppercase mt-1 opacity-90">Digital Dojo</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-3">
        <div className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase px-3 mb-2">Principal</div>
        <nav className="flex flex-col gap-1 mb-6">
          {navPrincipal.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all border ${
                  item.active
                    ? 'bg-red-500/10 border-red-500/20 text-white shadow-lg shadow-red-950/20'
                    : 'text-zinc-400 border-transparent hover:bg-[var(--color-superficie)] hover:text-white'
                }`}
              >
                <Icon size={18} className={item.active ? 'text-[var(--color-primario)]' : ''} />
                <span className="text-sm font-semibold font-['Inter']">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase px-3 mb-2">Tatami Tools</div>
        <nav className="flex flex-col gap-1">
          {navTatami.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 border border-transparent rounded-xl hover:bg-[var(--color-superficie)] hover:text-white transition-all"
              >
                <Icon size={18} />
                <span className="text-sm font-semibold font-['Inter']">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-[var(--color-borde)] bg-black/20 mt-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-800 to-red-600 flex items-center justify-center font-black text-white border-2 border-[var(--color-primario)] flex-shrink-0 shadow-lg shadow-red-900/20">
            {iniciales}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-sm text-white truncate font-['Inter']">{usuario.nombre}</p>
            <p className="text-[10px] text-zinc-400 truncate">{usuario.grado_cinturon}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-zinc-500 hover:text-[var(--color-primario)] transition-colors uppercase tracking-widest bg-zinc-900/50 rounded-lg border border-zinc-800/50 hover:border-red-900/50"
        >
          <LogOut size={14} /> Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
