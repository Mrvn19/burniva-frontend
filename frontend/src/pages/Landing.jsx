import Navbar from '../components/layout/Navbar'
import HeroSection from '../components/landing/HeroSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import WhySection from '../components/landing/WhySection'
import HowItWorksSection from '../components/landing/HowItWorksSection'
import DemoSection from '../components/landing/DemoSection'
import FAQSection from '../components/landing/FAQSection'
import CTASection from '../components/landing/CTASection'
import Footer from '../components/landing/Footer'

function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <WhySection />
      <HowItWorksSection />
      <DemoSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default Landing