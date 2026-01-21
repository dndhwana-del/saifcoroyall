import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroPalace from "@/assets/hero-palace.jpg";
import CalligraphyAccent from "./CalligraphyAccent";
import RoyalButton from "./RoyalButton";
import GoldenArchway from "./GoldenArchway";
import RoyalDivider from "./RoyalDivider";
import MagneticButton from "./MagneticButton";
const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll progress for this section
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Parallax Fade-Out transforms
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]); // Slower parallax movement

  return <section ref={sectionRef} className="relative min-h-[110vh] flex items-center justify-center pt-20 pb-32 overflow-hidden">
      {/* Continuous background - no hard cuts */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Parallax Fade-Out Container */}
      <motion.div className="absolute inset-0" style={{
      opacity,
      scale,
      y
    }}>
        {/* Warm ambient glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50 z-10" />
        
        {/* Golden hour vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_200px_60px_hsla(42,55%,58%,0.08)] z-10 pointer-events-none" />

        {/* Hero Image with Archway Frame */}
        <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16 pb-24">
          <GoldenArchway className="w-full max-w-6xl h-[75vh] md:h-[85vh]">
            <div className="relative w-full h-full overflow-hidden rounded-t-archway">
              {/* Ken Burns Effect - Slow zoom animation */}
              <motion.img src={heroPalace} alt="Luxurious Arabian Gulf Palace Interior" className="w-full h-full object-cover object-center" initial={{
              scale: 1
            }} animate={{
              scale: 1.15
            }} transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }} />
              {/* Warm overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/40 to-transparent" />
              {/* Text readability gradient overlay - stronger at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>
          </GoldenArchway>
        </div>
      </motion.div>

      {/* Hero Content - Also fades with parallax */}
      <motion.div className="relative z-20 container mx-auto px-6 text-center" style={{
      opacity,
      y
    }}>
        <div className="max-w-4xl mx-auto">
          {/* Arabic Calligraphy Element */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="mb-6">
            <CalligraphyAccent className="mx-auto w-48 h-12" />
          </motion.div>
          
          {/* Main Title - Cinematic Hero Reveal */}
          <motion.h1 
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.9,
            }} 
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }} 
            transition={{
              duration: 1.8,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94]
            }} 
            className="relative text-5xl md:text-7xl lg:text-8xl font-royal leading-tight mb-6 tracking-[0.15em]"
          >
            {/* Soft glow backdrop */}
            <span className="absolute inset-0 blur-3xl bg-gradient-to-r from-transparent via-[hsl(42,55%,58%)]/30 to-transparent scale-150 animate-pulse" />
            
            {/* Main title with gold luminous effect */}
            <span className="relative inline-block">
              {/* Multi-tone gold gradient text */}
              <span 
                className="relative bg-gradient-to-b from-[hsl(45,70%,75%)] via-[hsl(42,55%,58%)] to-[hsl(38,50%,45%)] bg-clip-text text-transparent"
                style={{
                  textShadow: '0 0 40px hsla(42, 55%, 58%, 0.5), 0 0 80px hsla(42, 55%, 58%, 0.3), 0 4px 12px hsla(8, 27%, 10%, 0.5)',
                  WebkitTextStroke: '0.5px hsla(42, 55%, 58%, 0.3)',
                }}
              >
                ROYAL GULF
              </span>
              
              {/* Light sweep overlay */}
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
                initial={{ x: '-200%' }}
                animate={{ x: '200%' }}
                transition={{
                  duration: 2.5,
                  delay: 1.5,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 6
                }}
              />
              
              {/* Metallic reflection highlight */}
              <span 
                className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent bg-clip-text pointer-events-none"
                style={{ 
                  mixBlendMode: 'overlay',
                  maskImage: 'linear-gradient(to bottom, black 30%, transparent 70%)'
                }}
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.6
        }} className="font-display text-xl md:text-2xl text-sand/90 mb-4 italic drop-shadow-md">
            Where Heritage Meets Magnificence
          </motion.p>

          <motion.div initial={{
          opacity: 0,
          scaleX: 0
        }} animate={{
          opacity: 1,
          scaleX: 1
        }} transition={{
          duration: 0.8,
          delay: 0.7
        }}>
            <RoyalDivider />
          </motion.div>

          {/* Description */}
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.8
        }} className="font-body text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-gray-100 drop-shadow-md">
            Discover an exclusive collection of palatial residences, 
            curated for those who seek the pinnacle of Arabian luxury and timeless elegance.
          </motion.p>

          {/* CTA Buttons with Magnetic Effect */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 1
        }} className="flex flex-col sm:flex-row gap-6 justify-center shadow-royal">
            <MagneticButton strength={0.4}>
              <RoyalButton size="md" className="[&>span]:drop-shadow-md">
                View Collection
              </RoyalButton>
            </MagneticButton>
            <MagneticButton strength={0.4}>
              <RoyalButton variant="secondary" size="md">
                Private Consultation
              </RoyalButton>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Also fades out */}
      <motion.div initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8,
      delay: 1.2
    }} className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20" style={{
      opacity
    }}>
        <div className="flex flex-col items-center gap-2 text-gold/80">
          <span className="font-body text-xs tracking-[0.3em] uppercase">Discover</span>
          <motion.div className="w-px h-16 bg-gradient-to-b from-gold/60 to-transparent" animate={{
          y: [0, 10, 0]
        }} transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }} />
        </div>
      </motion.div>
    </section>;
};
export default HeroSection;