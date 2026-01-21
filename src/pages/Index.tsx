import { motion } from "framer-motion";
import heroPalace from "@/assets/hero-palace.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import CalligraphyAccent from "@/components/CalligraphyAccent";
import RoyalButton from "@/components/RoyalButton";
import GoldenArchway from "@/components/GoldenArchway";
import RoyalDivider from "@/components/RoyalDivider";
import PropertyCard from "@/components/PropertyCard";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";
import LocationsSection from "@/components/LocationsSection";
import MegaFooter from "@/components/MegaFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background mashrabiya-pattern">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalligraphyAccent className="w-20 h-6" />
            <span className="font-royal text-xl tracking-[0.2em] text-primary">
              ROYAL GULF
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#estates" className="font-body text-sm tracking-wider text-foreground/80 hover:text-primary transition-colors">
              Estates
            </a>
            <a href="#heritage" className="font-body text-sm tracking-wider text-foreground/80 hover:text-primary transition-colors">
              Heritage
            </a>
            <a href="#collection" className="font-body text-sm tracking-wider text-foreground/80 hover:text-primary transition-colors">
              Collection
            </a>
            <a href="#contact" className="font-body text-sm tracking-wider text-foreground/80 hover:text-primary transition-colors">
              Contact
            </a>
          </div>
          <RoyalButton variant="secondary" size="sm">
            Enquire
          </RoyalButton>
        </div>
      </nav>

      {/* Hero Section - The Grand Lobby */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Warm ambient glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background/90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50 z-10" />
        
        {/* Text readability gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-10 pointer-events-none" />
        
        {/* Golden hour vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_200px_60px_hsla(42,55%,58%,0.08)] z-10 pointer-events-none" />

        {/* Hero Image with Archway Frame - Ken Burns Effect */}
        <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16">
          <GoldenArchway className="w-full max-w-6xl h-[70vh] md:h-[80vh]">
            <div className="relative w-full h-full overflow-hidden rounded-t-archway">
              <motion.img 
                src={heroPalace} 
                alt="Luxurious Arabian Gulf Palace Interior" 
                className="w-full h-full object-cover object-center"
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }}
                transition={{ 
                  duration: 20, 
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              {/* Warm overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/30 to-transparent" />
            </div>
          </GoldenArchway>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Arabic Calligraphy Element */}
            <div className="opacity-0 animate-fade-in-up mb-6">
              <CalligraphyAccent className="mx-auto w-48 h-12" />
            </div>
            
            {/* Main Title */}
            <h1 className="opacity-0 animate-fade-in-up animation-delay-200 text-4xl md:text-6xl lg:text-7xl font-royal leading-tight mb-6 text-shimmer">
              Royal Gulf Estates
            </h1>

            {/* Subtitle */}
            <p className="opacity-0 animate-fade-in-up animation-delay-400 font-display text-xl md:text-2xl text-foreground/80 mb-4 italic">
              Where Heritage Meets Magnificence
            </p>

            <RoyalDivider className="opacity-0 animate-fade-in-up animation-delay-400" />

            {/* Description */}
            <p className="opacity-0 animate-fade-in-up animation-delay-600 font-body text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-gray-50">
              Discover an exclusive collection of palatial residences, 
              curated for those who seek the pinnacle of Arabian luxury and timeless elegance.
            </p>

            {/* CTA Buttons */}
            <div className="opacity-0 animate-fade-in-up animation-delay-800 flex flex-col sm:flex-row gap-4 justify-center">
              <RoyalButton size="lg">
                View Collection
              </RoyalButton>
              <RoyalButton variant="outline" size="lg">
                Private Consultation
              </RoyalButton>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 opacity-0 animate-fade-in-up animation-delay-800">
          <div className="flex flex-col items-center gap-2 text-primary/60">
            <span className="font-body text-xs tracking-[0.3em] uppercase">Explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent animate-float" />
          </div>
        </div>
      </section>

      {/* Featured Section - Stats */}
      <section className="relative py-24 bg-card mashrabiya-pattern">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
            <CalligraphyAccent className="mx-auto mb-6 w-32 h-8" />
            <h2 className="text-3xl md:text-5xl font-royal mb-6 text-shimmer">
              Exceptional Estates
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Each residence in our portfolio represents the zenith of architectural mastery, 
              blending traditional Arabian artistry with contemporary sophistication.
            </p>
          </ScrollReveal>

          {/* Stats */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[{
              value: "50+",
              label: "Royal Estates"
            }, {
              value: "25",
              label: "Years of Excellence"
            }, {
              value: "100%",
              label: "Private & Exclusive"
            }, {
              value: "∞",
              label: "Legacy Value"
            }].map((stat, index) => (
              <StaggerItem key={index}>
                <div className="text-center p-6 border border-primary/20 bg-background/50 shadow-soft">
                  <div className="font-royal text-3xl md:text-4xl text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="font-body text-sm text-muted-foreground tracking-wider uppercase">
                    {stat.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Royal Collection - Property Cards */}
      <section id="collection" className="relative py-24 bg-background mashrabiya-pattern">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
            <CalligraphyAccent className="mx-auto mb-6 w-32 h-8" />
            <h2 className="text-3xl md:text-5xl font-royal mb-6 text-shimmer">
              The Royal Collection
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              A curated gallery of the Gulf's most distinguished residences, 
              each a masterpiece of heritage and opulence.
            </p>
          </ScrollReveal>

          {/* Property Cards Grid */}
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto" staggerDelay={0.2}>
            <StaggerItem>
              <PropertyCard image={property1} title="Al Qasr Palace" location="Emirates Hills, Dubai" price="AED 185M" bedrooms={12} bathrooms={15} area="45,000 sqft" />
            </StaggerItem>
            <StaggerItem>
              <PropertyCard image={property2} title="Pearl Bay Estate" location="The Pearl, Doha" price="AED 142M" bedrooms={9} bathrooms={12} area="38,000 sqft" />
            </StaggerItem>
            <StaggerItem>
              <PropertyCard image={property3} title="Skyline Majlis" location="Downtown, Dubai" price="AED 98M" bedrooms={6} bathrooms={8} area="22,000 sqft" />
            </StaggerItem>
          </StaggerContainer>

          {/* View All Button */}
          <ScrollReveal className="text-center mt-16" delay={0.4}>
            <RoyalButton variant="secondary" size="lg">
              Explore Full Collection
            </RoyalButton>
          </ScrollReveal>
        </div>
      </section>

      {/* Heritage Section */}
      <section id="heritage" className="relative py-24 bg-espresso text-sand mashrabiya-pattern">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <CalligraphyAccent className="mb-6 w-32 h-8" />
              <h2 className="text-3xl md:text-5xl font-royal mb-6 text-gold">
                A Legacy of Distinction
              </h2>
              <p className="font-body text-lg text-sand/80 leading-relaxed mb-6">
                For over two decades, Royal Gulf Estates has been the trusted custodian 
                of the Arabian Peninsula's most extraordinary properties. Our heritage 
                is woven into the very fabric of Gulf luxury.
              </p>
              <p className="font-body text-lg text-sand/80 leading-relaxed mb-8">
                We understand that acquiring a royal residence is not merely a transaction—
                it is the beginning of a legacy that will endure for generations.
              </p>
              <RoyalButton variant="outline" className="border-gold text-gold hover:bg-gold hover:text-espresso">
                Our Story
              </RoyalButton>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-gold/20 to-bronze/10 border-2 border-gold/30 shadow-gold flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="font-royal text-6xl text-gold mb-4">٢٥</div>
                    <div className="font-body text-sm tracking-[0.3em] uppercase text-sand/60">
                      Years of Excellence
                    </div>
                  </div>
                </div>
                {/* Decorative corner */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-gold/40" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-gold/40" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 bg-background mashrabiya-pattern">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <ScrollReveal>
            <CalligraphyAccent className="mx-auto mb-6 w-32 h-8" />
            <h2 className="text-3xl md:text-5xl font-royal mb-6 text-shimmer">
              Begin Your Journey
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-10">
              Every exceptional estate begins with a conversation. 
              Allow our dedicated team to guide you toward your royal residence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <RoyalButton size="lg">
                Schedule Consultation
              </RoyalButton>
            </div>
            <div className="mt-16 pt-8 border-t border-primary/20">
              <p className="font-body text-sm text-muted-foreground tracking-wider">
                Discretion Assured · By Appointment Only · Dubai · Abu Dhabi · Doha
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Prime Coordinates - Locations Section */}
      <LocationsSection />

      {/* Mega Footer */}
      <MegaFooter />
    </div>
  );
};

export default Index;