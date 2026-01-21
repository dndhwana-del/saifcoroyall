import { motion, useScroll, useTransform, Variants, Transition } from "framer-motion";
import { useRef } from "react";
import heroPalace from "@/assets/hero-palace.jpg";
import CalligraphyAccent from "@/components/CalligraphyAccent";
import RoyalButton from "@/components/RoyalButton";
import GlassPanel from "@/components/GlassPanel";

const SlideHero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Title characters with stagger
  const title = "Royal Gulf Estates";
  const titleChars = title.split("");

  const getCharTransition = (i: number): Transition => ({
    delay: i * 0.05 + 0.5,
    duration: 0.8,
    ease: "easeOut" as const
  });

  return (
    <section 
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden snap-start"
    >
      {/* Background with Ken Burns zoom */}
      <motion.div 
        className="absolute inset-0"
        style={{ scale }}
      >
        <img 
          src={heroPalace} 
          alt="Luxurious Arabian Gulf Palace" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-espresso/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/40 via-transparent to-espresso/40" />
      
      {/* Mashrabiya pattern overlay */}
      <div className="absolute inset-0 mashrabiya-pattern opacity-30" />
      
      {/* Golden vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_60px_hsla(42,55%,58%,0.1)]" />

      {/* Content */}
      <motion.div 
        className="relative z-20 container mx-auto px-6 text-center"
        style={{ opacity }}
      >
        <GlassPanel intensity="heavy" className="max-w-4xl mx-auto p-12">
          {/* Calligraphy */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <CalligraphyAccent className="mx-auto w-48 h-12" />
          </motion.div>

          {/* Staggered Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-royal leading-tight mb-6 overflow-hidden">
            {titleChars.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, color: "hsl(42, 55%, 58%)" }}
                animate={{ opacity: 1, y: 0, color: "hsl(45, 100%, 95%)" }}
                transition={getCharTransition(i)}
                className="inline-block"
                style={{ 
                  display: char === " " ? "inline" : "inline-block",
                  marginRight: char === " " ? "0.3em" : "0",
                  textShadow: "0 0 40px hsla(42, 55%, 58%, 0.5)"
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p 
            className="font-display text-xl md:text-2xl text-sand/90 mb-8 italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Where Heritage Meets Magnificence
          </motion.p>

          {/* Decorative line */}
          <motion.div 
            className="w-32 h-px mx-auto bg-gradient-to-r from-transparent via-gold to-transparent mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <RoyalButton size="lg">View Collection</RoyalButton>
            <RoyalButton variant="outline" size="lg">Private Consultation</RoyalButton>
          </motion.div>
        </GlassPanel>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <div className="flex flex-col items-center gap-2 text-gold/60">
          <span className="font-body text-xs tracking-[0.3em] uppercase">Scroll</span>
          <motion.div 
            className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default SlideHero;
