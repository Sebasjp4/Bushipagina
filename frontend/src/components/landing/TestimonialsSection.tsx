import { TESTIMONIALS } from '../../data/testimonials'
import QuoteCard from './QuoteCard'

export default function TestimonialsSection() {
  return (
    <section className="bg-paper text-ink py-[120px]">
      <div className="max-w-[1240px] mx-auto px-7">
        <div data-reveal className="flex items-end justify-between gap-[30px] mb-[54px] flex-wrap">
          <div>
            <div className="font-label uppercase tracking-[0.34em] text-sm text-blood font-semibold">
              Lo que dice nuestra familia
            </div>
            <h2 className="font-display uppercase leading-[0.92] text-[clamp(2.4rem,6vw,5rem)] text-ink mt-2">
              Voces del <em className="not-italic text-blood">tatami</em>
            </h2>
          </div>
          <div className="font-label text-base tracking-[0.3em] text-blood uppercase">/ 06 — Comunidad</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <QuoteCard key={t.name} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
