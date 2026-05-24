import { ATHLETES } from '../../data/athletes'
import AthleteCard from './AthleteCard'

export default function AthletesSection() {
  return (
    <section id="atletas" className="py-[120px] bg-[linear-gradient(180deg,#0b0b0d,#121015)]">
      <div className="max-w-[1240px] mx-auto px-7">
        <div data-reveal className="flex items-end justify-between gap-[30px] mb-[54px] flex-wrap">
          <div>
            <div className="font-label uppercase tracking-[0.34em] text-sm text-blood font-semibold">
              El orgullo del tatami
            </div>
            <h2 className="font-display uppercase leading-[0.92] text-[clamp(2.4rem,6vw,5rem)] text-paper mt-2">
              Nuestros <em className="not-italic text-blood">atletas</em>
            </h2>
          </div>
          <div className="font-label text-base tracking-[0.3em] text-gold uppercase">/ 03 — Equipo</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[26px]">
          {ATHLETES.map((athlete) => (
            <AthleteCard key={athlete.name} athlete={athlete} />
          ))}
        </div>
      </div>
    </section>
  )
}
