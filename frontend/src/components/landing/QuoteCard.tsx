import type { Testimonial } from '../../data/testimonials'

export default function QuoteCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div data-reveal className="bg-white border border-[#d8d0bf] px-7 py-8 relative">
      <div className="font-jp text-[3.4rem] text-blood leading-[0.4] h-6">「</div>
      <p className="font-body text-[1.08rem] text-[#33312a] italic my-3.5 mb-5">{testimonial.quote}</p>
      <div className="flex items-center gap-3">
        <span className="w-[42px] h-[42px] rounded-full bg-[linear-gradient(135deg,var(--color-blood),var(--color-blood-deep))] grid place-items-center text-white font-display text-[1.1rem]">
          {testimonial.initial}
        </span>
        <div>
          <b className="font-label text-[1.2rem] tracking-wider uppercase block leading-none text-ink">
            {testimonial.name}
          </b>
          <small className="text-[#8a8472] font-label tracking-[0.1em]">{testimonial.role}</small>
        </div>
      </div>
    </div>
  )
}
