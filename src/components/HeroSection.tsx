import { motion } from "framer-motion";
import heroPalace from "@/assets/hero-palace.jpg";
import CalligraphyAccent from "./CalligraphyAccent";
import RoyalButton from "./RoyalButton";
import GoldenArchway from "./GoldenArchway";
import RoyalDivider from "./RoyalDivider";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Warm ambient glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background/90 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50 z-10" />
      
      {/* Golden hour vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_60px_hsla(42,55%,58%,0.08)] z-10 pointer-events-none" />

      {/* Hero Image with Archway Frame */}
      <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16">
        <GoldenArchway className="w-full max-w-6xl h-[70vh] md:h-[80vh]">
          <div className="relative w-full h-full overflow-hidden rounded-t-archway">
            {/* Ken Burns Effect - Slow zoom animation */}
            <motion.img
              src={heroPalace}
              alt="Luxurious Arabian Gulf Palace Interior"
              className="w-full h-full object-cover object-center"
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            />
            {/* Warm overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-espresso/20 to-transparent" />
            {/* Text readability gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          </div>
        </GoldenArchway>
      </div>

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
          
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-royal leading-tight mb-6 text-shimmer"
          >
            Royal Gulf Estates
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-display text-xl md:text-2xl text-foreground/80 mb-4 italic"
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
            className="font-body text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-gray-50"
          >
            Discover an exclusive collection of palatial residences, 
            curated for those who seek the pinnacle of Arabian luxury and timeless elegance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <RoyalButton size="lg">
              View Collection
            </RoyalButton>
            <RoyalButton variant="outline" size="lg">
              Private Consultation
            </RoyalButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2 text-primary/60">
          <span className="font-body text-xs tracking-[0.3em] uppercase">Explore</span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
