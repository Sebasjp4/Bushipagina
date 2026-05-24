import { Bell } from 'lucide-react'

interface MobileHeaderProps {
  usuario: any
}

export default function MobileHeader({ usuario }: MobileHeaderProps) {
  const iniciales =
    usuario?.nombre
      ?.split(' ')
      .map((n: string) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'AT'

  return (
    <header className="md:hidden flex items-center justify-between p-4 bg-zinc-950/80 backdrop-blur-xl border-b border-white/[0.05] sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <img src="/img/Isotipo.png" alt="Bushi Kai Logo" className="w-9 h-9 object-contain flex-shrink-0" />
        <div className="flex flex-col justify-center">
          <h1 className="font-['Montserrat'] font-black text-lg tracking-tighter text-white leading-none uppercase">
            BUSHIKAI
          </h1>
          <p className="text-[8px] font-black tracking-[0.25em] text-red-600 uppercase mt-0.5 opacity-80">
            Digital Dojo
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-zinc-500 active:scale-90 transition-transform">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-600 rounded-full border-2 border-zinc-950"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-[10px] font-black text-zinc-300">
          {iniciales}
        </div>
      </div>
    </header>
  )
}
