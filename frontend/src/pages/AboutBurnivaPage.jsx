import AboutNavbar from '../components/about/AboutNavbar'
import AboutHero from '../components/about/AboutHero'
import BurnivaStory from '../components/about/BurnivaStory'
import WhatIsBurniva from '../components/about/WhatIsBurniva'
import NamePhilosophy from '../components/about/NamePhilosophy'
import LogoPhilosophy from '../components/about/LogoPhilosophy'
import VisionMission from '../components/about/VisionMission'
import BurnivaValues from '../components/about/BurnivaValues'
import DevelopmentPrinciples from '../components/about/DevelopmentPrinciples'
import BurnivaJourney from '../components/about/BurnivaJourney'
import AboutClosing from '../components/about/AboutClosing'
import AboutFooter from '../components/about/AboutFooter'

function AboutBurnivaPage() {
  return (
    <div className="min-h-screen font-sans bg-white">
      <AboutNavbar />
      
      <main>
        <AboutHero />
        <BurnivaStory />
        <WhatIsBurniva />
        <NamePhilosophy />
        <LogoPhilosophy />
        <VisionMission />
        <BurnivaValues />
        <DevelopmentPrinciples />
        <BurnivaJourney />
        <AboutClosing />
      </main>

      <AboutFooter />
    </div>
  )
}

export default AboutBurnivaPage
