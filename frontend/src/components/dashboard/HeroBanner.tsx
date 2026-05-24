import { Trophy, Swords, ShieldCheck } from 'lucide-react'

interface HeroBannerProps {
  usuario: any
}

export default function HeroBanner({ usuario }: HeroBannerProps) {
  const calcularCategoria = (peso: number) => {
    if (!peso || peso === 0) return '---'
    if (peso <= 60) return '-60kg'
    if (peso <= 67) return '-67kg'
    if (peso <= 75) return '-75kg'
    if (peso <= 84) return '-84kg'
    return '+84kg'
  }

  const rangoLimpio = usuario?.grado_cinturon?.toLowerCase().split(' ').pop() || 'blanco'
  const beltClass = `belt-${rangoLimpio}`
  const primerNombre = usuario?.nombre?.split(' ')[0] || 'Atleta'
  const categoria = calcularCategoria(usuario?.peso_actual)

  return (
    <section className="relative overflow-hidden rounded-3xl border border-(--color-borde) bg-zinc-900/40 shadow-2xl transition-all">
      <div className="absolute right-4 -bottom-6 select-none pointer-events-none z-0">
        <span className="text-[180px] font-black text-red-600/4 leading-none">武</span>
      </div>

      <div className="absolute inset-0 bg-linear-to-br from-red-950/10 via-transparent to-transparent z-0" />

      <div className="relative z-10 p-9 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-6 md:space-y-6">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <p className="text-(--color-primario) font-black tracking-[0.3em] uppercase text-[10px]">
                Estado del atleta
              </p>
              {usuario?.es_entrenador && (
                <span className="flex items-center gap-1 bg-red-800/10 text-zinc-300 text-[8px] font-black px-2 py-0.5 rounded-full border border-red-500/50 tracking-widest uppercase">
                  <ShieldCheck size={10} className="text-red-400" /> Bushi-Staff
                </span>
              )}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter font-['Montserrat']">
              Bienvenido, {primerNombre}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`dynamic-belt ${beltClass} px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg`}
            >
              {usuario?.grado_cinturon || 'Cinturón Blanco'}
            </div>
            <div className="h-px w-12 bg-zinc-800" />
            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest font-['Inter']">
              Bushikai Elite
            </span>
          </div>
        </div>

        <div className="flex gap-4 md:gap-8 bg-black/40 p-5 rounded-2xl border border-white/5 backdrop-blur-md">
          <div className="flex flex-col items-center md:items-start min-w-20">
            <div className="flex items-center gap-2 text-zinc-500 mb-1">
              <Swords size={14} className="text-red-600" />
              <span className="text-[9px] font-black uppercase tracking-wider">División</span>
            </div>
            <span className="text-xl font-black text-white font-['Montserrat']">{categoria}</span>
          </div>

          <div className="w-px bg-white/10 self-stretch" />

          <div className="flex flex-col items-center md:items-start min-w-20">
            <div className="flex items-center gap-2 text-zinc-500 mb-1">
              <Trophy size={14} className="text-amber-300" />
              <span className="text-[9px] font-black uppercase tracking-wider">Puntos</span>
            </div>
            <span className="text-xl font-black text-white font-['Montserrat']">
              {usuario?.puntos_ranking || 0}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-0.5 w-full opacity-40 bg-linear-to-r from-transparent via-(--color-primario) to-transparent" />
    </section>
  )
}
