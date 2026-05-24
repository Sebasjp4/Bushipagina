import { MARQUEE_TERMS } from '../../data/contact'

export default function MarqueeStrip() {
  // Duplicamos los términos dos veces para hacer un loop sin cortes
  const terms = [...MARQUEE_TERMS, ...MARQUEE_TERMS]

  return (
    <div className="bg-blood text-paper overflow-hidden border-y-2 border-ink">
      <div className="flex gap-[60px] whitespace-nowrap font-display uppercase text-[1.6rem] tracking-[0.06em] py-[14px] animate-marquee w-max">
        {terms.map((term, i) => (
          <span key={i} className="flex items-center gap-[60px]">
            <span className="opacity-90">{term}</span>
            <span className="text-ink font-jp">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
