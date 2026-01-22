import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import heroPalace from "@/assets/hero-palace.jpg";
import CalligraphyAccent from "./CalligraphyAccent";
import RoyalButton from "./RoyalButton";
import RoyalDivider from "./RoyalDivider";
import MagneticButton from "./MagneticButton";

// Using the single palace image with Ken Burns effect
const heroSlides = [heroPalace];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 5 seconds (when multiple slides available)
  useEffect(() => {
    if (heroSlides.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full-bleed Hero Image Slider - NO white fog */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {heroSlides.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                {/* Ken Burns Effect - Slow zoom animation */}
                <motion.img 
                  src={slide} 
                  alt={`Luxurious Arabian Gulf Palace Interior ${index + 1}`}
                  className="w-full h-full object-cover object-center"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.15 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                  }} 
                />
              </motion.div>
            )
          ))}
        </AnimatePresence>
        
        {/* Warm espresso overlay - preserves luxury tones, NO white */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />
        {/* Subtle vignette for depth */}
        <div className="absolute inset-0 shadow-[inset_0_0_150px_40px_hsla(25,30%,8%,0.4)] pointer-events-none" />
      </div>
      
      {/* Thin navbar fade - only top 80px, espresso NOT white */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-espresso/50 to-transparent z-10" />

      {/* Slide Indicators - only show when multiple slides */}
      {heroSlides.length > 1 && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                index === currentSlide 
                  ? 'bg-gold w-8' 
                  : 'bg-sand/40 hover:bg-sand/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Arabic Calligraphy Element */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }} 
            className="mb-6"
          >
            <CalligraphyAccent className="mx-auto w-48 h-12" />
          </motion.div>
          
          {/* Main Title - Cinematic Brand Reveal */}
          <div className="relative mb-6">
            {/* Golden Glow Blob Behind Title */}
            <motion.div 
              className="absolute inset-0 -inset-x-20 -inset-y-10 bg-gradient-radial from-gold/20 via-gold/5 to-transparent blur-[100px] pointer-events-none" 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 2, delay: 0.3, ease: "easeOut" }} 
            />
            
            <motion.h1 
              initial={{ opacity: 0, y: 20, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              transition={{ duration: 1.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }} 
              className="relative text-5xl md:text-7xl lg:text-8xl font-royal leading-tight uppercase tracking-[0.15em]" 
              style={{ textShadow: '0 4px 30px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.4)' }}
            >
              <span className="royal-title-embossed text-right text-7xl font-thin">Royal Gulf</span>
            </motion.h1>
            
            {/* Light Sweep Overlay - Triggers after entrance */}
            <motion.div 
              className="absolute inset-0 pointer-events-none overflow-hidden" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 2, duration: 0.3 }}
            >
              <div className="royal-light-sweep absolute inset-0" />
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.6 }} 
            className="font-display text-xl md:text-2xl text-sand/90 mb-4 italic" 
            style={{ textShadow: '0 2px 15px rgba(0,0,0,0.6)' }}
          >
            Where Heritage Meets Magnificence
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }} 
            animate={{ opacity: 1, scaleX: 1 }} 
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <RoyalDivider />
          </motion.div>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.8 }} 
            className="font-body text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-gray-100" 
            style={{ textShadow: '0 2px 15px rgba(0,0,0,0.6)' }}
          >
            Discover an exclusive collection of palatial residences, 
            curated for those who seek the pinnacle of Arabian luxury and timeless elegance.
          </motion.p>

          {/* CTA Buttons with Magnetic Effect */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 1 }} 
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <MagneticButton strength={0.4}>
              <RoyalButton size="lg" className="[&>span]:drop-shadow-md">
                View Collection
              </RoyalButton>
            </MagneticButton>
            <MagneticButton strength={0.4}>
              <RoyalButton variant="outline" size="lg" className="border-sand/50 text-sand hover:bg-sand hover:text-espresso">
                Private Consultation
              </RoyalButton>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - positioned to overlap next section visually */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, delay: 1.2 }} 
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2 text-gold/80">
          <span className="font-body text-xs tracking-[0.3em] uppercase">Discover</span>
          <motion.div 
            className="w-px h-16 bg-gradient-to-b from-gold/60 to-transparent" 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
