import { STATS } from '../../data/contact'

export default function StatsBar() {
  return (
    <div
      data-reveal
      className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line mt-[70px]"
    >
      {STATS.map((stat) => (
        <div key={stat.label} className="bg-ink py-[34px] px-6 text-center">
          <div className="font-display text-[3.4rem] text-paper leading-none">
            {stat.highlight ? (
              <em className="not-italic text-blood">{stat.number}</em>
            ) : (
              stat.number
            )}
          </div>
          <div className="font-label uppercase tracking-[0.16em] text-[0.92rem] text-paper-dim mt-1.5">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
