import { Navbar } from './components/Navbar';
import { ParticleBackground } from './components/ParticleBackground';
import { ScrollVideoBackground } from './components/ScrollVideoBackground';
import { TitleSection } from './components/TitleSection';
import { FixedCardsSection } from './components/FixedCardsSection';
import { StatsSection } from './components/StatsSection';
import { FactoryTransitionSection } from './components/FactoryTransitionSection';
import { VisionSection } from './components/VisionSection';
import { ObservationSection } from './components/ObservationSection';
import { InnovationContrastSection } from './components/InnovationContrastSection';
import { SiteSection } from './components/SiteSection';
import { ZoningSection } from './components/ZoningSection';
import { RobotsSection } from './components/RobotsSection';
import { ConstructionSimulationSection } from './components/ConstructionSimulationSection';
import { ScenariosSection } from './components/ScenariosSection';
import { EndingSection } from './components/EndingSection';

function App() {
  return (
    <div className="relative bg-[#0a0a0a] text-white font-sans selection:bg-white/20 selection:text-white antialiased overflow-x-hidden">
      <ScrollVideoBackground fadeZoneId="video-zone" />
      <ParticleBackground />
      <Navbar />

      <div id="video-zone" className="relative">
        <TitleSection />
        <FixedCardsSection />
      </div>

      <StatsSection />
      <InnovationContrastSection />
      <FactoryTransitionSection />
      <VisionSection />
      <ObservationSection />
      <SiteSection />
      <ZoningSection />
      <RobotsSection />
      <ConstructionSimulationSection />
      <ScenariosSection />
      <EndingSection />
    </div>
  );
}

export default App;
