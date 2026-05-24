import { PLANS } from '../../data/pricing'
import PricingPlan from './PricingPlan'

export default function PricingSection() {
  return (
    <section id="planes" className="py-[120px] bg-[linear-gradient(180deg,#101015,#0b0b0d)]">
      <div className="max-w-[1240px] mx-auto px-7">
        <div data-reveal className="flex items-end justify-between gap-[30px] mb-[54px] flex-wrap">
          <div>
            <div className="font-label uppercase tracking-[0.34em] text-sm text-blood font-semibold">
              Inscríbete hoy
            </div>
            <h2 className="font-display uppercase leading-[0.92] text-[clamp(2.4rem,6vw,5rem)] text-paper mt-2">
              Planes &amp; <em className="not-italic text-blood">tarifas</em>
            </h2>
          </div>
          <div className="font-label text-base tracking-[0.3em] text-gold uppercase">
            / 05 — Membresías
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <PricingPlan key={plan.title} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  )
}
