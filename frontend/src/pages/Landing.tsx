import { useScrollReveal } from '../hooks/useScrollReveal'
import LandingNav from '../components/landing/LandingNav'
import HeroSection from '../components/landing/HeroSection'
import MarqueeStrip from '../components/landing/MarqueeStrip'
import AboutSection from '../components/landing/AboutSection'
import ProgramsSection from '../components/landing/ProgramsSection'
import AthletesSection from '../components/landing/AthletesSection'
import ScheduleSection from '../components/landing/ScheduleSection'
import PricingSection from '../components/landing/PricingSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import CTASection from '../components/landing/CTASection'
import ContactSection from '../components/landing/ContactSection'
import LandingFooter from '../components/landing/LandingFooter'

export default function Landing() {
  useScrollReveal()

  return (
    <div className="bg-ink text-paper font-body antialiased overflow-x-hidden scroll-smooth">
      <LandingNav />
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />
      <ProgramsSection />
      <AthletesSection />
      <ScheduleSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <ContactSection />
      <LandingFooter />
    </div>
  )
}
