import { Home, LayoutGrid, Timer, Calendar, User } from 'lucide-react'

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-md border-t border-[var(--color-borde)] pb-safe pt-2 px-2 flex justify-around items-center h-16">
      <button className="flex flex-col items-center gap-1 w-16 text-[var(--color-primario)]">
        <Home size={22} />
        <span className="text-[9px] font-bold uppercase tracking-widest">Inicio</span>
      </button>

      <button className="flex flex-col items-center gap-1 w-16 text-zinc-500 hover:text-zinc-300 transition-colors">
        <LayoutGrid size={22} />
        <span className="text-[9px] font-bold uppercase tracking-widest">Tatami</span>
      </button>

      <div className="relative -top-5 flex flex-col items-center">
        <button className="w-14 h-14 rounded-full bg-[var(--color-primario)] border-4 border-zinc-950 flex items-center justify-center text-white shadow-[0_0_15px_rgba(179,28,34,0.4)] hover:scale-105 transition-transform">
          <Timer size={24} />
        </button>
        <span className="absolute -bottom-4 text-[9px] font-bold uppercase tracking-widest text-[var(--color-primario)]">
          Timer
        </span>
      </div>

      <button className="flex flex-col items-center gap-1 w-16 text-zinc-500 hover:text-zinc-300 transition-colors">
        <Calendar size={22} />
        <span className="text-[9px] font-bold uppercase tracking-widest">Eventos</span>
      </button>

      <button className="flex flex-col items-center gap-1 w-16 text-zinc-500 hover:text-zinc-300 transition-colors">
        <User size={22} />
        <span className="text-[9px] font-bold uppercase tracking-widest">Perfil</span>
      </button>
    </nav>
  )
}
