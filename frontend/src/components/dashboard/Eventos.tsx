import { useState, useEffect } from 'react'
import { CalendarDays, MapPin, ChevronRight } from 'lucide-react'

interface EventosProps {
  layout: 'slider' | 'sidebar'
}

export default function Eventos({ layout }: EventosProps) {
  const [eventos, setEventos] = useState<any[]>([])

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/eventos/')
        if (res.ok) setEventos(await res.json())
      } catch (error) {
        console.error('Error cargando eventos', error)
      }
    }
    fetchEventos()
  }, [])

  const isSlider = layout === 'slider'

  return (
    <section className={`w-full ${isSlider ? 'mt-6' : ''}`}>
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="font-black tracking-[0.15em] text-(--color-texto-muted) uppercase text-xs font-['Montserrat']">
          Próximos Eventos
        </h3>
        {isSlider && (
          <span className="text-[10px] text-zinc-600 font-bold flex items-center gap-1">
            Desliza <ChevronRight size={10} />
          </span>
        )}
      </div>

      <div
        className={`
        ${
          isSlider
            ? 'flex overflow-x-auto gap-4 pb-4 no-scrollbar snap-x snap-mandatory'
            : 'flex flex-col gap-4 bg-(--color-superficie) border border-(--color-borde) rounded-2xl p-6 shadow-xl'
        }
      `}
      >
        {eventos.map((evento) => (
          <div
            key={evento.id}
            className={`
              relative transition-all border border-(--color-borde) rounded-2xl p-4
              ${
                isSlider
                  ? 'min-w-280px bg-zinc-900/40 snap-center'
                  : 'bg-transparent border-0 border-b border-zinc-800 last:border-0 p-0 pb-4 last:pb-0'
              }
            `}
          >
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    evento.es_nacional
                      ? 'bg-(--color-primario) shadow-[0_0_8px_rgba(179,28,34,0.6)]'
                      : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                  }`}
                />
                {!isSlider && <div className="w-1px h-full bg-(--color-borde) my-1" />}
              </div>

              <div className="flex-1">
                <h4 className="font-bold text-white text-sm font-['Inter'] mb-1 truncate">{evento.titulo}</h4>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                    <CalendarDays size={12} />
                    <span>
                      {new Date(evento.fecha).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                    <MapPin size={12} />
                    <span className="truncate">{evento.lugar}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
