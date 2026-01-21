import { motion } from "framer-motion";
import RoyalButton from "@/components/RoyalButton";
import CalligraphyAccent from "@/components/CalligraphyAccent";
import SlideHero from "@/components/slides/SlideHero";
import SlideLegacy from "@/components/slides/SlideLegacy";
import SlideVault from "@/components/slides/SlideVault";
import SlideMap from "@/components/slides/SlideMap";
import SlideServices from "@/components/slides/SlideServices";
import SlideFooter from "@/components/slides/SlideFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-espresso/80 backdrop-blur-md border-b border-gold/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalligraphyAccent className="w-20 h-6" />
            <span className="font-royal text-xl tracking-[0.2em] text-gold">
              ROYAL GULF
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#legacy" className="font-body text-sm tracking-wider text-sand/80 hover:text-gold transition-colors">
              Legacy
            </a>
            <a href="#vault" className="font-body text-sm tracking-wider text-sand/80 hover:text-gold transition-colors">
              Collection
            </a>
            <a href="#map" className="font-body text-sm tracking-wider text-sand/80 hover:text-gold transition-colors">
              Locations
            </a>
            <a href="#services" className="font-body text-sm tracking-wider text-sand/80 hover:text-gold transition-colors">
              Services
            </a>
            <a href="#contact" className="font-body text-sm tracking-wider text-sand/80 hover:text-gold transition-colors">
              Contact
            </a>
          </div>
          <RoyalButton variant="secondary" size="sm">
            Enquire
          </RoyalButton>
        </div>
      </nav>

      {/* Snap Scroll Container */}
      <div className="h-screen overflow-y-auto snap-y snap-mandatory">
        {/* Slide 1: The Grand Entrance */}
        <SlideHero />

        {/* Slide 2: The Royal Legacy - overlaps hero with negative margin effect */}
        <div id="legacy" className="relative -mt-20">
          <SlideLegacy />
        </div>

        {/* Slide 3: The Vault - Carousel */}
        <div id="vault" className="relative -mt-16">
          <SlideVault />
        </div>

        {/* Slide 4: The Map - Command Center */}
        <div id="map" className="relative -mt-12">
          <SlideMap />
        </div>

        {/* Slide 5: Concierge Services */}
        <div id="services" className="relative -mt-12">
          <SlideServices />
        </div>

        {/* Slide 6: The Signature - Footer */}
        <div id="contact" className="relative -mt-8">
          <SlideFooter />
        </div>
      </div>
    </div>
  );
};

export default Index;
