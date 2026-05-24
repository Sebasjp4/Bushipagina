import { PROGRAMS } from '../../data/programs'
import ProgramCard from './ProgramCard'

export default function ProgramsSection() {
  return (
    <section id="programas" className="bg-paper text-ink py-[120px]">
      <div className="max-w-[1240px] mx-auto px-7">
        <div data-reveal className="flex items-end justify-between gap-[30px] mb-[54px] flex-wrap">
          <div>
            <div className="font-label uppercase tracking-[0.34em] text-sm text-blood font-semibold">
              Para cada edad y objetivo
            </div>
            <h2 className="font-display uppercase leading-[0.92] text-[clamp(2.4rem,6vw,5rem)] text-ink mt-2">
              Nuestros <em className="not-italic text-blood">programas</em>
            </h2>
          </div>
          <div className="font-label text-base tracking-[0.3em] text-blood-deep uppercase">
            / 02 — Entrenamiento
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMS.map((program) => (
            <ProgramCard key={program.title} program={program} />
          ))}
        </div>
      </div>
    </section>
  )
}
