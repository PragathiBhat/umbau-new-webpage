import { ParticleBackground } from './components/ParticleBackground';
import { ScrollVideoBackground } from './components/ScrollVideoBackground';
import { BackToTopButton } from './components/BackToTopButton';
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
    <div className="relative bg-[#0a0a0a] text-white font-sans selection:bg-sci-green/30 selection:text-white antialiased overflow-x-hidden">
      <ScrollVideoBackground fadeZoneId="video-zone" />
      <div className="fixed inset-0 z-[1] bg-blueprint-grid pointer-events-none" aria-hidden="true" />
      <ParticleBackground />

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

      <BackToTopButton />
    </div>
  );
}

export default App;
