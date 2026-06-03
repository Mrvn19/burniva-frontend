import TeamNavbar from '../components/team/TeamNavbar'
import TeamHero from '../components/team/TeamHero'
import WhyBuiltSection from '../components/team/WhyBuiltSection'
import ExpertiseSection from '../components/team/ExpertiseSection'
import TeamStructure from '../components/team/TeamStructure'
import TeamMembersSection from '../components/team/TeamMembersSection'
import WhatWeBuilt from '../components/team/WhatWeBuilt'
import DevelopmentJourney from '../components/team/DevelopmentJourney'
import TechnologyBehind from '../components/team/TechnologyBehind'
import TeamClosing from '../components/team/TeamClosing'
import TeamFooter from '../components/team/TeamFooter'

function TeamIdentityPage() {
  return (
    <div className="min-h-screen bg-white">
      <TeamNavbar />
      <TeamHero />
      <WhyBuiltSection />
      <ExpertiseSection />
      <TeamStructure />
      <TeamMembersSection />
      <WhatWeBuilt />
      <DevelopmentJourney />
      <TechnologyBehind />
      <TeamClosing />
      <TeamFooter />
    </div>
  )
}

export default TeamIdentityPage
