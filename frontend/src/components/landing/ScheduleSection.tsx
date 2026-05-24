import { SCHEDULE } from '../../data/schedule'

function Pill({ time }: { time?: string }) {
  if (!time) return <span className="text-paper-dim">—</span>
  return (
    <span className="inline-block bg-blood/[0.16] text-[#f1a8ae] border border-blood/40 px-3 py-0.5 text-[0.95rem] tracking-wider">
      {time}
    </span>
  )
}

export default function ScheduleSection() {
  return (
    <section id="horarios" className="bg-ink-2 py-[120px]">
      <div className="max-w-[1240px] mx-auto px-7">
        <div data-reveal className="flex items-end justify-between gap-[30px] mb-[54px] flex-wrap">
          <div>
            <div className="font-label uppercase tracking-[0.34em] text-sm text-blood font-semibold">
              Encuentra tu horario
            </div>
            <h2 className="font-display uppercase leading-[0.92] text-[clamp(2.4rem,6vw,5rem)] text-paper mt-2">
              Horarios de <em className="not-italic text-blood">clases</em>
            </h2>
          </div>
          <div className="font-label text-base tracking-[0.3em] text-gold uppercase">/ 04 — Agenda</div>
        </div>

        <div data-reveal className="overflow-x-auto">
          <table className="w-full border-collapse font-label text-[1.18rem]">
            <thead>
              <tr>
                <th className="text-left uppercase tracking-[0.14em] text-gold font-semibold p-4 border-b-2 border-blood text-base">
                  Día
                </th>
                <th className="text-left uppercase tracking-[0.14em] text-gold font-semibold p-4 border-b-2 border-blood text-base">
                  Infantil (4–11)
                </th>
                <th className="text-left uppercase tracking-[0.14em] text-gold font-semibold p-4 border-b-2 border-blood text-base">
                  Juvenil / Adultos
                </th>
                <th className="text-left uppercase tracking-[0.14em] text-gold font-semibold p-4 border-b-2 border-blood text-base">
                  Competición
                </th>
              </tr>
            </thead>
            <tbody>
              {SCHEDULE.map((row) => (
                <tr key={row.day} className="hover:bg-blood/[0.06] transition-colors">
                  <td className="p-4 border-b border-line text-paper font-semibold tracking-wider">
                    {row.day}
                  </td>
                  <td className="p-4 border-b border-line text-[#d8d2c4]">
                    <Pill time={row.infantil} />
                  </td>
                  <td className="p-4 border-b border-line text-[#d8d2c4]">
                    <Pill time={row.adultos} />
                  </td>
                  <td className="p-4 border-b border-line text-[#d8d2c4]">
                    <Pill time={row.competicion} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
