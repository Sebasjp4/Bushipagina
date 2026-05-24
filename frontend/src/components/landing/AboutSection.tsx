import StatsBar from './StatsBar'
import { CONTACT } from '../../data/contact'

export default function AboutSection() {
  return (
    <section
      id="dojo"
      className="relative py-[120px] bg-[linear-gradient(180deg,#0b0b0d,#101015)]"
    >
      <div className="max-w-[1240px] mx-auto px-7">
        <div
          data-reveal
          className="flex items-end justify-between gap-[30px] mb-[54px] flex-wrap"
        >
          <div>
            <div className="font-label uppercase tracking-[0.34em] text-sm text-blood font-semibold">
              武士会 — La asociación de los guerreros
            </div>
            <h2 className="font-display uppercase leading-[0.92] text-[clamp(2.4rem,6vw,5rem)] text-paper mt-2">
              Más que un
              <br />
              <em className="not-italic text-blood">deporte.</em> Un camino.
            </h2>
          </div>
          <div className="font-label text-base tracking-[0.3em] text-gold uppercase">/ 01 — El Dojo</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-[60px] items-center">
          <div data-reveal className="font-body">
            <p className="text-[1.16rem] text-[#d8d2c4] mb-5">
              <span className="text-paper">{CONTACT.dojoName}</span> nació en {CONTACT.foundedYear} en el
              corazón de {CONTACT.address.city.split(',')[0]} con una idea simple: que el karate fuera
              una herramienta de formación de vida, no solo de competencia.
            </p>
            <p className="text-[1.16rem] text-[#d8d2c4] mb-5">
              Hoy somos una de las escuelas de Karate-Do referentes de la región Caribe, con más de 200
              alumnos activos entre nuestras sedes y deportistas que compiten a nivel departamental,
              nacional e internacional.
            </p>

            <div className="border-l-[3px] border-blood py-1.5 pl-6 my-[30px] font-jp text-[1.25rem] text-paper">
              “Primero comprende el corazón, luego la técnica.”
              <small className="block font-label tracking-[0.2em] uppercase text-gold text-[0.9rem] mt-2">
                Filosofía del Dojo {CONTACT.dojoName}
              </small>
            </div>

            <p className="text-[1.16rem] text-[#d8d2c4]">
              Nuestro método combina la tradición del karate japonés —kihon, kata y kumite— con
              preparación física moderna y acompañamiento pedagógico para los más pequeños.
            </p>
          </div>

          <div data-reveal className="bg-[#15151b] border border-line overflow-hidden">
            <div
              className="aspect-[4/5] grid place-items-center relative
              bg-[radial-gradient(80%_60%_at_30%_10%,rgba(207,34,48,0.4),transparent_60%),linear-gradient(140deg,#22222a,#0d0d11)]"
            >
              <span className="font-jp font-extrabold text-[9rem] text-paper/[0.08]">道</span>
              <span className="absolute bottom-3.5 left-3.5 font-label uppercase tracking-[0.15em] text-[0.8rem] text-paper-dim bg-black/45 px-2.5 py-1 border border-line">
                Foto: dojo / clase grupal
              </span>
            </div>
            <div className="p-[22px]">
              <span className="font-label uppercase tracking-[0.14em] text-blood text-base">
                Sede Principal
              </span>
              <h3 className="font-display uppercase text-[1.7rem] text-paper">
                {CONTACT.address.neighborhood.replace('Barrio ', '')}
              </h3>
            </div>
          </div>
        </div>

        <StatsBar />
      </div>
    </section>
  )
}
