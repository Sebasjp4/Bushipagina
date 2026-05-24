import { CONTACT } from '../../data/contact'

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-end pb-[7vh] overflow-hidden
      bg-[radial-gradient(120%_90%_at_78%_18%,rgba(207,34,48,0.22),transparent_55%),linear-gradient(180deg,#0b0b0d_0%,#121116_60%,#0b0b0d_100%)]"
    >
      {/* Sol pulsante */}
      <div
        className="absolute top-[-14%] right-[-6%] w-[62vmin] h-[62vmin] rounded-full opacity-90 blur-[2px] animate-breathe
        bg-[radial-gradient(circle_at_50%_50%,var(--color-blood)_0%,var(--color-blood-deep)_55%,transparent_72%)]"
        aria-hidden
      />

      {/* Rayos giratorios */}
      <div
        className="absolute top-[-14%] right-[-6%] w-[62vmin] h-[62vmin] rounded-full opacity-[0.18] animate-spin-slow
        bg-[repeating-conic-gradient(from_0deg_at_50%_50%,var(--color-paper)_0deg_6deg,transparent_6deg_12deg)]
        [mask:radial-gradient(circle,transparent_30%,#000_31%,#000_70%,transparent_71%)]"
        aria-hidden
      />

      {/* Kanji gigante de fondo */}
      <div
        className="absolute left-[-3vw] top-[8vh] font-jp font-extrabold text-[46vh] text-paper/[0.035] leading-[0.8] select-none pointer-events-none"
        aria-hidden
      >
        武士会
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-7 w-full">
        <div className="font-label text-sm tracking-[0.34em] uppercase text-blood font-semibold mb-[22px] opacity-0 animate-rise [animation-delay:0.2s]">
          Karate-Do tradicional · {CONTACT.address.city}
        </div>

        <h1
          className="font-display uppercase leading-[0.92] tracking-[0.01em] text-paper
          text-[clamp(3.6rem,13vw,12rem)] [text-shadow:0_6px_40px_rgba(0,0,0,0.5)]"
        >
          <span className="block overflow-hidden">
            <span className="block translate-y-[110%] animate-rise [animation-delay:0.25s]">Dojo</span>
          </span>
          <span className="block overflow-hidden">
            <span className="block translate-y-[110%] text-blood animate-rise [animation-delay:0.4s]">
              {CONTACT.dojoName}
            </span>
          </span>
        </h1>

        <p className="max-w-[520px] mt-[26px] mb-[34px] text-[1.18rem] text-paper-dim opacity-0 animate-rise [animation-delay:0.8s]">
          Forjamos carácter, disciplina y técnica. Una escuela donde niños, jóvenes y adultos
          entrenan cuerpo y espíritu bajo la guía de instructores certificados.
        </p>

        <div className="flex gap-4 flex-wrap opacity-0 animate-rise [animation-delay:1s]">
          <a
            href={CONTACT.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-label uppercase tracking-widest text-xl px-[30px] py-[14px] border-[1.5px] border-blood bg-blood text-paper hover:bg-blood-deep hover:-translate-y-[3px] transition-all duration-300"
          >
            Primera clase gratis
          </a>
          <a
            href="#programas"
            className="font-label uppercase tracking-widest text-xl px-[30px] py-[14px] border-[1.5px] border-blood text-paper hover:bg-paper hover:text-ink transition-all duration-300"
          >
            Ver programas
          </a>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-[7vh] right-7 z-10 text-right font-label uppercase tracking-[0.12em] text-base text-paper-dim opacity-0 animate-rise [animation-delay:1.2s]">
        Fundado en <b className="text-gold">{CONTACT.foundedYear}</b>
        <br />
        {CONTACT.address.neighborhood} · {CONTACT.address.line1}
      </div>
    </section>
  )
}
