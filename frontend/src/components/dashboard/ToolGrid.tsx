import { useState } from 'react'
import { Timer, Dices, UserCircle, Flame, Trophy, Plane, Calendar as CalendarIcon } from 'lucide-react'

const herramientas = [
  { id: 1, nombre: 'Cronómetro WKF', desc: 'Puntos, faltas y tiempo oficial', icon: Timer, categoria: 'Kumite', badge: 'LIVE', accent: 'red' },
  { id: 2, nombre: 'Ruleta del Caos', desc: 'Escenarios de combate aleatorios', icon: Dices, categoria: 'Kumite', accent: 'purple' },
  { id: 3, nombre: 'Simulador de Circuitos', desc: 'Grupos, rotaciones y series', icon: Flame, categoria: 'Físico', accent: 'orange' },
  { id: 4, nombre: 'Tablero de PRs', desc: 'Tus marcas personales y fechas', icon: Trophy, categoria: 'Físico', accent: 'gold' },
  { id: 5, nombre: 'Calculadora de Viajes', desc: 'Hotel, transporte e inscripción', icon: Plane, categoria: 'General', accent: 'teal' },
  { id: 6, nombre: 'Calendario de Eventos', desc: 'Torneos y circulares oficiales', icon: CalendarIcon, categoria: 'General', accent: 'blue' },
  { id: 7, nombre: 'Generador de Bunkai', desc: 'Análisis y secuencias paso a paso', icon: UserCircle, categoria: 'Kata', accent: 'blue' },
]

const categorias = ['Todos', 'Kumite', 'Kata', 'Físico', 'General']

const colorMap: any = {
  red: { text: 'text-red-500', bg: 'bg-red-500/10', border: 'hover:border-red-500/40', glow: 'bg-red-500' },
  purple: { text: 'text-purple-500', bg: 'bg-purple-500/10', border: 'hover:border-purple-500/40', glow: 'bg-purple-500' },
  orange: { text: 'text-orange-500', bg: 'bg-orange-500/10', border: 'hover:border-orange-500/40', glow: 'bg-orange-500' },
  gold: { text: 'text-amber-500', bg: 'bg-amber-500/10', border: 'hover:border-amber-500/40', glow: 'bg-amber-500' },
  teal: { text: 'text-teal-500', bg: 'bg-teal-500/10', border: 'hover:border-teal-500/40', glow: 'bg-teal-500' },
  blue: { text: 'text-blue-500', bg: 'bg-blue-500/10', border: 'hover:border-blue-500/40', glow: 'bg-blue-500' },
}

export default function ToolGrid() {
  const [filtro, setFiltro] = useState('Todos')

  const filtradas = filtro === 'Todos' ? herramientas : herramientas.filter((h) => h.categoria === filtro)

  return (
    <section className="mt-10">
      <div className="flex items-end justify-between mb-6 px-1">
        <div>
          <h2 className="text-xl font-black tracking-[0.15em] text-[var(--color-texto-muted)] uppercase font-['Montserrat']">
            Herramientas de Tatami
          </h2>
        </div>
        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{filtradas.length} módulos</span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-4">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setFiltro(cat)}
            className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all border ${
              filtro === cat
                ? 'bg-[var(--color-primario)] border-[var(--color-primario)] text-white shadow-lg shadow-red-950/20'
                : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {filtradas.map((tool) => {
          const Icon = tool.icon
          const style = colorMap[tool.accent]

          return (
            <div
              key={tool.id}
              className={`group relative bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:bg-zinc-800/40 ${style.border}`}
            >
              {tool.badge && (
                <span className="absolute top-4 right-4 text-[9px] font-black tracking-widest bg-red-500/10 text-red-500 px-2 py-0.5 rounded-md border border-red-500/20">
                  {tool.badge}
                </span>
              )}

              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${style.bg} ${style.text}`}
              >
                <Icon size={20} strokeWidth={2.5} />
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-[15px] text-white leading-tight font-['Inter']">{tool.nombre}</h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">{tool.desc}</p>
              </div>

              <div
                className={`absolute bottom-0 left-4 right-4 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity blur-[1px] ${style.glow}`}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
