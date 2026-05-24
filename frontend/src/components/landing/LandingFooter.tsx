import { CONTACT } from '../../data/contact'

export default function LandingFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#070708] border-t border-line py-[46px]">
      <div className="max-w-[1240px] mx-auto px-7 flex items-center justify-between gap-5 flex-wrap font-label uppercase tracking-widest text-paper-dim">
        <div className="text-[1.3rem] text-paper flex items-center gap-2">
          <span className="font-jp">武</span> Dojo {CONTACT.dojoName} · {CONTACT.address.city.split(',')[0]}
        </div>
        <div className="flex gap-[22px]">
          {['Instagram', 'Facebook', 'WhatsApp', 'YouTube'].map((s) => (
            <a key={s} href="#" className="hover:text-blood transition-colors">
              {s}
            </a>
          ))}
        </div>
        <div>© {year} — Karate-Do · 押忍 Osu</div>
      </div>
    </footer>
  )
}
