import type { Athlete } from '../../data/athletes'

export default function AthleteCard({ athlete }: { athlete: Athlete }) {
  return (
    <div
      data-reveal
      className="bg-[#141319] border border-line overflow-hidden hover:-translate-y-1.5 hover:border-blood/60 transition-all duration-400"
    >
      <div className="aspect-[1/1.12] relative grid place-items-end stretch bg-[linear-gradient(160deg,#26242e,#0e0d12)] after:content-[''] after:absolute after:inset-0 after:bg-[radial-gradient(70%_50%_at_50%_0%,rgba(207,34,48,0.32),transparent_60%)]">
        <span className="absolute top-3.5 left-3.5 z-[2] bg-blood text-white font-label uppercase tracking-widest text-[0.82rem] px-2.5 py-1">
          {athlete.badge}
        </span>
        {athlete.photo ? (
          <img src={athlete.photo} alt={athlete.name} className="absolute inset-0 w-full h-full object-cover z-[1]" />
        ) : (
          <span className="absolute inset-0 grid place-items-center font-jp font-extrabold text-[5.5rem] text-paper/[0.07] z-[1]">
            {athlete.kanji}
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display uppercase text-[1.5rem] text-paper">{athlete.name}</h3>
        <div className="font-label uppercase tracking-[0.14em] text-gold text-[0.95rem] mt-1 mb-3">
          {athlete.belt}
        </div>
        <ul className="flex flex-col gap-[7px] list-none">
          {athlete.achievements.map((a) => (
            <li
              key={a}
              className="font-body text-[0.98rem] text-[#c8c2b4] pl-[18px] relative before:content-['›'] before:absolute before:left-0 before:text-blood before:font-bold"
            >
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
