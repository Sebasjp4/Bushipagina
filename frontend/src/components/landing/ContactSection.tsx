import { CONTACT } from '../../data/contact'

export default function ContactSection() {
  return (
    <section id="contacto" className="bg-ink py-[90px]">
      <div className="max-w-[1240px] mx-auto px-7">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
          <div data-reveal className="border-t-2 border-blood pt-[18px]">
            <div className="font-label uppercase tracking-[0.18em] text-gold text-[0.95rem]">
              Ubicación
            </div>
            <div className="font-body text-[1.2rem] text-paper mt-1.5 leading-[1.45]">
              {CONTACT.address.line1}
              <br />
              {CONTACT.address.neighborhood}
              <br />
              {CONTACT.address.city}
            </div>
          </div>

          <div data-reveal className="border-t-2 border-blood pt-[18px]">
            <div className="font-label uppercase tracking-[0.18em] text-gold text-[0.95rem]">
              Contacto
            </div>
            <div className="font-body text-[1.2rem] text-paper mt-1.5 leading-[1.45]">
              WhatsApp:{' '}
              <a
                href={CONTACT.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blood transition-colors"
              >
                {CONTACT.whatsappNumber}
              </a>
              <br />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-blood transition-colors">
                {CONTACT.email}
              </a>
              <br />
              {CONTACT.schedule}
            </div>
          </div>

          <div data-reveal className="border-t-2 border-blood pt-[18px]">
            <div className="font-label uppercase tracking-[0.18em] text-gold text-[0.95rem]">
              Síguenos
            </div>
            <div className="font-body text-[1.2rem] text-paper mt-1.5 leading-[1.45]">
              Instagram {CONTACT.social.instagram}
              <br />
              Facebook / {CONTACT.social.facebook}
              <br />
              TikTok {CONTACT.social.tiktok}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
