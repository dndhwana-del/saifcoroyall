import { motion } from "framer-motion";
import heroPalace from "@/assets/hero-palace.jpg";
import CalligraphyAccent from "./CalligraphyAccent";
import RoyalButton from "./RoyalButton";
import GoldenArchway from "./GoldenArchway";
import RoyalDivider from "./RoyalDivider";
import MagneticButton from "./MagneticButton";

const HeroSection = () => {
  return (
    <section className="relative min-h-[110vh] flex items-center justify-center pt-20 pb-32 overflow-hidden">
      {/* Continuous background - no hard cuts */}
      <div className="absolute inset-0 bg-background" />
      
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
            <motion.img
              src={heroPalace}
              alt="Luxurious Arabian Gulf Palace Interior"
              className="w-full h-full object-cover object-center"
              initial={{ scale: 1 }}
              animate={{ scale: 1.15 }}
              transition={{
                duration: 25,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            />
            {/* Warm overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/40 to-transparent" />
            {/* Text readability gradient overlay - stronger at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
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
            className="text-4xl md:text-6xl lg:text-7xl font-royal leading-tight mb-6 text-shimmer drop-shadow-lg"
          >
            Royal Gulf Estates
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-display text-xl md:text-2xl text-sand/90 mb-4 italic drop-shadow-md"
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
            className="font-body text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-gray-100 drop-shadow-md"
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
              <RoyalButton variant="crystal" size="lg">
                View Collection
              </RoyalButton>
            </MagneticButton>
            <MagneticButton strength={0.4}>
              <RoyalButton variant="crystal" size="lg">
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
