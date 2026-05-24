import type { Program } from '../../data/programs'

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <div
      data-reveal
      className="group relative bg-white border border-[#d8d0bf] px-[30px] py-[34px] overflow-hidden cursor-pointer
      hover:-translate-y-2 hover:shadow-[0_26px_50px_-24px_rgba(0,0,0,0.4)] transition-all duration-400
      before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blood
      before:origin-top before:scale-y-0 before:transition-transform before:duration-400 hover:before:scale-y-100"
    >
      <div className="font-jp text-[2.4rem] text-blood font-extrabold leading-none">{program.kanji}</div>
      <h3 className="font-display uppercase text-[1.7rem] mt-3.5 mb-1.5 text-ink">{program.title}</h3>
      <div className="font-label uppercase tracking-[0.14em] text-[#8a8472] text-[0.95rem] mb-3.5">
        {program.age}
      </div>
      <p className="font-body text-[1.02rem] text-[#3a382f]">{program.description}</p>
      <span className="font-label uppercase tracking-[0.12em] text-blood mt-[18px] inline-block text-base">
        Conocer más →
      </span>
    </div>
  )
}
