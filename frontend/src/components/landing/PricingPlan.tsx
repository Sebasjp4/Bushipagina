import type { Plan } from '../../data/pricing'
import { CONTACT } from '../../data/contact'

export default function PricingPlan({ plan }: { plan: Plan }) {
  return (
    <div
      data-reveal
      className={`relative p-[30px] pt-[38px] text-center transition-transform duration-400 hover:-translate-y-2 border ${
        plan.featured
          ? 'border-blood bg-[linear-gradient(180deg,#1b1419,#15151b)]'
          : 'border-line bg-[#15151b]'
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-[13px] left-1/2 -translate-x-1/2 bg-blood text-white font-label uppercase tracking-[0.16em] text-[0.82rem] px-4 py-1">
          Más elegido
        </span>
      )}

      <h3 className="font-display uppercase text-[1.7rem] text-paper">{plan.title}</h3>

      <div className="font-display text-[3.6rem] text-paper my-3.5 leading-none">
        <em className="not-italic text-[1.1rem] text-paper-dim font-label">$</em>
        {plan.price}
      </div>

      <div className="font-label uppercase tracking-[0.14em] text-paper-dim text-[0.95rem]">
        {plan.period}
      </div>

      <ul className="my-6 text-left flex flex-col gap-[11px] list-none">
        {plan.features.map((f) => (
          <li
            key={f}
            className="font-body text-base text-[#cfc9bb] pl-6 relative before:content-['❯'] before:absolute before:left-0 before:text-blood before:text-[0.8rem] before:top-1"
          >
            {f}
          </li>
        ))}
      </ul>

      <a
        href={CONTACT.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`block w-full font-label uppercase tracking-widest text-xl px-[30px] py-[14px] border-[1.5px] border-blood transition-all duration-300 ${
          plan.featured
            ? 'bg-blood text-paper hover:bg-blood-deep'
            : 'text-paper hover:bg-paper hover:text-ink'
        }`}
      >
        {plan.ctaLabel}
      </a>
    </div>
  )
}
