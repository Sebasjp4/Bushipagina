import { CONTACT } from '../../data/contact'

export default function CTASection() {
  return (
    <section className="relative overflow-hidden text-center py-[120px] bg-blood text-paper">
      <div className="absolute inset-0 grid place-items-center font-jp font-extrabold text-[40vh] text-black/[0.08] pointer-events-none">
        始
      </div>

      <div className="relative z-[2] max-w-[1240px] mx-auto px-7">
        <div className="font-label uppercase tracking-[0.34em] text-sm text-white/80 font-semibold">
          Tu camino empieza con un paso
        </div>
        <h2 className="font-display uppercase leading-[0.92] text-[clamp(2.6rem,7vw,6rem)] text-paper mt-3.5 mb-[26px]">
          Ven a tu primera
          <br />
          clase gratis
        </h2>

        <div className="flex gap-4 flex-wrap justify-center">
          <a
            href={CONTACT.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-label uppercase tracking-widest text-xl px-[30px] py-[14px] border-[1.5px] border-ink bg-ink text-paper hover:bg-black transition-all duration-300"
          >
            Agendar por WhatsApp
          </a>
          <a
            href="#programas"
            className="font-label uppercase tracking-widest text-xl px-[30px] py-[14px] border-[1.5px] border-paper text-paper hover:bg-paper hover:text-blood transition-all duration-300"
          >
            Ver programas
          </a>
        </div>
      </div>
    </section>
  )
}
