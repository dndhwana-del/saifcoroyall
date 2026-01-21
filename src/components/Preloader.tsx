import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [phase, setPhase] = useState<"logo" | "reveal" | "done">("logo");

  useEffect(() => {
    // Logo pulse phase
    const pulseTimer = setTimeout(() => {
      setPhase("reveal");
    }, 2000);

    // Complete transition
    const completeTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Dark background */}
          <motion.div
            className="absolute inset-0 bg-espresso"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === "reveal" ? 0 : 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          {/* Split reveal panels */}
          <motion.div
            className="absolute inset-0 bg-espresso-dark"
            initial={{ clipPath: "inset(0 0 50% 0)" }}
            animate={{ 
              clipPath: phase === "reveal" ? "inset(0 0 100% 0)" : "inset(0 0 50% 0)" 
            }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-0 bg-espresso-dark"
            initial={{ clipPath: "inset(50% 0 0 0)" }}
            animate={{ 
              clipPath: phase === "reveal" ? "inset(100% 0 0 0)" : "inset(50% 0 0 0)" 
            }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Mashrabiya pattern overlay */}
          <div className="absolute inset-0 mashrabiya-pattern opacity-30 pointer-events-none" />

          {/* Logo Container */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: phase === "reveal" ? 0 : 1,
              scale: phase === "logo" ? [0.9, 1, 1.02, 1] : 0.95,
            }}
            transition={{ 
              duration: 1.5,
              ease: "easeOut",
              scale: { duration: 2, times: [0, 0.4, 0.7, 1] }
            }}
          >
            {/* Golden glow behind logo */}
            <motion.div
              className="absolute inset-0 -inset-20 bg-gradient-radial from-gold/20 via-gold/5 to-transparent blur-3xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Logo text */}
            <div className="relative text-center">
              <motion.h1
                className="font-royal text-5xl md:text-7xl tracking-[0.2em] uppercase"
                style={{
                  background: "linear-gradient(135deg, #F5E6A3 0%, #D4AF37 50%, #AA8A2D 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 30px rgba(212, 175, 55, 0.5))",
                }}
                animate={{
                  textShadow: [
                    "0 0 20px rgba(212, 175, 55, 0.3)",
                    "0 0 40px rgba(212, 175, 55, 0.6)",
                    "0 0 20px rgba(212, 175, 55, 0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Royal Gulf
              </motion.h1>
              
              {/* Decorative line */}
              <motion.div
                className="mx-auto mt-4 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              />
              
              {/* Tagline */}
              <motion.p
                className="mt-4 font-display text-sm md:text-base text-gold/60 italic tracking-[0.3em]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Estates
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;