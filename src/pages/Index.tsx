import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import CalligraphyAccent from "@/components/CalligraphyAccent";
import RoyalButton from "@/components/RoyalButton";
import ScrollReveal from "@/components/ScrollReveal";
import SmoothScrollReveal, { 
  MaskReveal, 
  FloatingElement, 
  ScrollLinkedReveal 
} from "@/components/SmoothScrollReveal";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";
import HeroSection from "@/components/HeroSection";
import LocationsSection from "@/components/LocationsSection";
import MegaFooter from "@/components/MegaFooter";
import PropertyCarousel from "@/components/PropertyCarousel";
import MagneticButton from "@/components/MagneticButton";
import ParallaxSection, { ParallaxFloat, ParallaxLayers, HorizontalParallax } from "@/components/ParallaxSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import TrustedPartners from "@/components/TrustedPartners";

const properties = [
  { image: property1, title: "Al Qasr Palace", location: "Emirates Hills, Dubai", price: "AED 185M", bedrooms: 12, bathrooms: 15, area: "45,000 sqft" },
  { image: property2, title: "Pearl Bay Estate", location: "The Pearl, Doha", price: "AED 142M", bedrooms: 9, bathrooms: 12, area: "38,000 sqft" },
  { image: property3, title: "Skyline Majlis", location: "Downtown, Dubai", price: "AED 98M", bedrooms: 6, bathrooms: 8, area: "22,000 sqft" },
  { image: property1, title: "Marina Crown", location: "Dubai Marina", price: "AED 165M", bedrooms: 10, bathrooms: 12, area: "42,000 sqft" },
  { image: property2, title: "Jumeirah Oasis", location: "Jumeirah Islands", price: "AED 88M", bedrooms: 7, bathrooms: 9, area: "28,000 sqft" },
];

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring for global parallax
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  // Global parallax for decorative elements
  const bgY = useTransform(smoothScroll, [0, 1], ["0%", "30%"]);
  const decorY = useTransform(smoothScroll, [0, 1], ["0%", "60%"]);
  const decorScale = useTransform(smoothScroll, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative">
      {/* Continuous Mashrabiya Pattern with Smooth Parallax */}
      <motion.div 
        className="fixed inset-0 mashrabiya-pattern pointer-events-none z-0"
        style={{ y: bgY, opacity: useTransform(smoothScroll, [0, 0.5, 1], [0.6, 1, 0.6]) }}
      />
      
      {/* Floating Decorative Elements with enhanced parallax */}
      <motion.div 
        className="fixed top-1/4 right-10 w-32 h-32 border border-gold/10 rounded-full pointer-events-none z-0"
        style={{ y: decorY, scale: decorScale, rotate: useTransform(smoothScroll, [0, 1], [0, 45]) }}
      />
      <motion.div 
        className="fixed bottom-1/3 left-10 w-20 h-20 border border-bronze/10 rotate-45 pointer-events-none z-0"
        style={{ y: useTransform(smoothScroll, [0, 1], ["0%", "-50%"]), scale: decorScale }}
      />
      <motion.div 
        className="fixed top-1/2 right-1/4 w-16 h-16 bg-gradient-radial from-gold/5 to-transparent rounded-full blur-2xl pointer-events-none z-0"
        style={{ y: useTransform(smoothScroll, [0, 1], ["0%", "-80%"]) }}
      />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-lg border-b border-primary/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CalligraphyAccent className="w-20 h-6" />
            <span className="font-display text-xl tracking-[0.2em] text-primary">
              ROYAL GULF
            </span>
          </motion.div>
          <motion.div 
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {["Estates", "Heritage", "Collection", "Contact"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-body text-sm tracking-wider text-foreground/70 hover:text-primary transition-colors relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <MagneticButton strength={0.3}>
              <RoyalButton variant="secondary" size="sm">
                Enquire
              </RoyalButton>
            </MagneticButton>
          </motion.div>
        </div>
      </nav>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Hero Section */}
      <HeroSection />

      {/* Trusted Partners Strip */}
      <TrustedPartners />

      {/* Property Carousel - Overlaps hero with negative margin */}
      <PropertyCarousel properties={properties} />

      {/* Stats Section with Enhanced Parallax Layers */}
      <ParallaxSection 
        id="estates" 
        className="relative -mt-8 py-16 z-10"
        smoothness={60}
      >
        <ParallaxLayers />
        <div className="container mx-auto px-6 relative z-10">
          <SmoothScrollReveal className="text-center max-w-3xl mx-auto mb-12" direction="up" blur>
            <FloatingElement intensity={0.15} direction="vertical">
              <CalligraphyAccent className="mx-auto mb-4 w-28 h-7" />
            </FloatingElement>
            <MaskReveal direction="up" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-royal mb-4 text-shimmer">
                Exceptional Estates
              </h2>
            </MaskReveal>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Each residence represents the zenith of architectural mastery
            </p>
          </SmoothScrollReveal>

          {/* Stats with floating card effect and scroll-linked parallax */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            {[
              { value: "50+", label: "Royal Estates" },
              { value: "25", label: "Years of Excellence" },
              { value: "100%", label: "Private & Exclusive" },
              { value: "∞", label: "Legacy Value" },
            ].map((stat, index) => (
              <StaggerItem key={index}>
                <ScrollLinkedReveal parallaxIntensity={0.1 + index * 0.05}>
                  <motion.div 
                    className="text-center p-5 md:p-6 border border-primary/20 bg-card/80 backdrop-blur-sm shadow-soft relative overflow-hidden group"
                    whileHover={{ 
                      y: -8, 
                      boxShadow: "0 20px 40px -15px hsla(42, 55%, 50%, 0.3)" 
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    <div className="font-royal text-2xl md:text-3xl text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="font-body text-xs text-muted-foreground tracking-wider uppercase">
                      {stat.label}
                    </div>
                  </motion.div>
                </ScrollLinkedReveal>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </ParallaxSection>

      {/* Heritage Section with Enhanced Parallax Background */}
      <ParallaxSection 
        id="heritage" 
        className="relative py-20 text-sand overflow-hidden"
        backgroundImage={property1}
        overlayColor="hsla(8, 27%, 12%, 0.92)"
        speed={0.5}
        scale
        smoothness={50}
      >
        {/* Additional overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/50 via-transparent to-espresso/70 z-[1]" />
        
        {/* Pattern continuation */}
        <div className="absolute inset-0 mashrabiya-pattern opacity-20 z-[2]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <SmoothScrollReveal direction="left" distance={80} blur>
              <FloatingElement intensity={0.12} direction="vertical">
                <CalligraphyAccent className="mb-4 w-28 h-7" />
              </FloatingElement>
              <MaskReveal direction="left" delay={0.15}>
                <h2 className="text-3xl md:text-5xl font-royal mb-5 text-gold">
                  A Legacy of Distinction
                </h2>
              </MaskReveal>
              <p className="font-body text-base md:text-lg text-sand/80 leading-relaxed mb-5">
                For over two decades, Royal Gulf Estates has been the trusted custodian 
                of the Arabian Peninsula's most extraordinary properties.
              </p>
              <p className="font-body text-base md:text-lg text-sand/70 leading-relaxed mb-8">
                We understand that acquiring a royal residence is not merely a transaction—
                it is the beginning of a legacy that will endure for generations.
              </p>
              <MagneticButton strength={0.3}>
                <RoyalButton variant="outline" className="border-gold text-gold hover:bg-gold hover:text-espresso">
                  Our Story
                </RoyalButton>
              </MagneticButton>
            </SmoothScrollReveal>
            
            <SmoothScrollReveal direction="right" delay={0.2} distance={80} blur>
              <FloatingElement intensity={0.2} direction="both" className="relative">
                {/* Decorative element with overlapping text */}
                <motion.div 
                  className="aspect-square bg-gradient-to-br from-gold/20 to-bronze/10 border-2 border-gold/30 shadow-gold flex items-center justify-center backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-center p-8">
                    <motion.div 
                      className="font-royal text-6xl md:text-7xl text-gold mb-3"
                      animate={{ 
                        textShadow: ["0 0 20px hsla(42,55%,58%,0.3)", "0 0 40px hsla(42,55%,58%,0.6)", "0 0 20px hsla(42,55%,58%,0.3)"]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      ٢٥
                    </motion.div>
                    <div className="font-body text-sm tracking-[0.3em] uppercase text-sand/60">
                      Years of Excellence
                    </div>
                  </div>
                </motion.div>
                
                {/* Overlapping corners with parallax */}
                <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-gold/50" />
                <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-gold/50" />
                
                {/* Floating label that overlaps */}
                <motion.div 
                  className="absolute -bottom-6 -right-6 md:-right-10 bg-gold px-6 py-3 shadow-lg z-20"
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="font-royal text-sm tracking-widest text-espresso uppercase">
                    Est. 1999
                  </span>
                </motion.div>
              </FloatingElement>
            </SmoothScrollReveal>
          </div>
        </div>
      </ParallaxSection>

      {/* Contact Section with Enhanced Smooth Parallax */}
      <ParallaxSection 
        id="contact" 
        className="relative py-20 overflow-hidden"
        speed={0.25}
        smoothness={60}
      >
        {/* Gradient connection to next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-espresso-dark" />
        
        {/* Floating decorative elements with smooth parallax */}
        <FloatingElement intensity={0.25} direction="horizontal" className="absolute top-20 right-20 opacity-20">
          <div className="w-40 h-40 border border-gold/30 rounded-full" />
        </FloatingElement>
        <FloatingElement intensity={0.35} direction="horizontal" className="absolute bottom-20 left-20 opacity-20">
          <div className="w-24 h-24 border border-bronze/30 rotate-45" />
        </FloatingElement>
        <FloatingElement intensity={0.2} direction="vertical" className="absolute top-1/2 left-1/4 opacity-10">
          <div className="w-32 h-32 bg-gradient-radial from-gold/20 to-transparent rounded-full blur-3xl" />
        </FloatingElement>
        
        <div className="container mx-auto px-6 text-center max-w-3xl relative z-10">
          <SmoothScrollReveal direction="up" distance={60} blur>
            <FloatingElement intensity={0.1} direction="vertical">
              <CalligraphyAccent className="mx-auto mb-4 w-28 h-7" />
            </FloatingElement>
            <MaskReveal direction="up" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-royal mb-5 text-shimmer">
                Begin Your Journey
              </h2>
            </MaskReveal>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              Every exceptional estate begins with a conversation. 
              Allow our dedicated team to guide you toward your royal residence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton strength={0.4}>
                <RoyalButton size="lg">
                  Schedule Consultation
                </RoyalButton>
              </MagneticButton>
            </div>
            <motion.div 
              className="mt-12 pt-6 border-t border-primary/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="font-body text-sm text-muted-foreground tracking-wider">
                Discretion Assured · By Appointment Only · Dubai · Abu Dhabi · Doha
              </p>
            </motion.div>
          </SmoothScrollReveal>
        </div>
      </ParallaxSection>

      {/* Locations Section */}
      <LocationsSection />

      {/* Mega Footer */}
      <MegaFooter />
    </div>
  );
};

export default Index;
