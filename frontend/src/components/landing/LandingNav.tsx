import { useNavScroll } from '../../hooks/useNavScroll'
import { CONTACT } from '../../data/contact'

export default function LandingNav() {
  const scrolled = useNavScroll()

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] border-b transition-[background,backdrop-filter,border-color] duration-400 ${
        scrolled
          ? 'bg-ink/85 backdrop-blur-xl border-line'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-7 flex items-center justify-between h-[74px]">
        <a href="#top" className="flex items-center gap-3 font-display text-2xl tracking-wider uppercase">
          <span
            className="w-[34px] h-[34px] grid place-items-center bg-blood text-paper font-jp font-extrabold text-lg
            [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]"
          >
            武
          </span>
          {CONTACT.dojoName}
        </a>

        <nav className="hidden md:flex gap-9 font-label text-lg uppercase tracking-widest">
          {[
            { href: '#dojo', label: 'El Dojo' },
            { href: '#programas', label: 'Programas' },
            { href: '#atletas', label: 'Atletas' },
            { href: '#horarios', label: 'Horarios' },
            { href: '#planes', label: 'Planes' },
            { href: '#contacto', label: 'Contacto' },
          ].map((link) => (
            <a key={link.href} href={link.href} className="opacity-80 hover:opacity-100 hover:text-blood transition-all duration-200">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={CONTACT.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-block font-label text-lg uppercase tracking-widest border-[1.5px] border-blood text-paper px-5 py-2 hover:bg-blood transition-colors duration-300"
        >
          Clase de prueba
        </a>

        <button aria-label="Abrir menú" className="md:hidden flex flex-col gap-[5px]">
          <span className="w-[26px] h-[2px] bg-paper" />
          <span className="w-[26px] h-[2px] bg-paper" />
          <span className="w-[26px] h-[2px] bg-paper" />
        </button>
      </div>
    </header>
  )
}
