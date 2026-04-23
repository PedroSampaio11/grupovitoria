import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { HeroCapture } from "@/components/sections/hero-capture";
import { Marquee } from "@/components/sections/marquee";
import { ImpactStats } from "@/components/sections/impact-stats";
import { BentoGrid } from "@/components/sections/bento-grid";
import { LegacyTimeline } from "@/components/sections/legacy-timeline";
import { StickyJourney } from "@/components/sections/sticky-journey";
import { FleetTabs } from "@/components/sections/fleet-tabs";
import { DeliveriesGallery } from "@/components/sections/deliveries-gallery";
import { InteractiveMap } from "@/components/sections/interactive-map";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroCapture />
        <Marquee />
        <div id="servicos"><ImpactStats /></div>
        <BentoGrid />
        <div id="sobre"><LegacyTimeline /></div>
        <StickyJourney />
        <div id="frota"><FleetTabs /></div>
        <DeliveriesGallery />
        <InteractiveMap />
        <Testimonials />
      </main>
      <div id="contato"><Footer /></div>
    </div>
  );
}
