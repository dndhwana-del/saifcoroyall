import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Morphing page transition wrapper
 * Creates a cinematic full-screen wipe effect between routes
 */
const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        className="relative w-full"
      >
        {/* Page content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 1, 0.5, 1],
          }}
        >
          {children}
        </motion.div>

        {/* Morphing overlay - enters from bottom, exits to top */}
        <motion.div
          className="fixed inset-0 z-[100] bg-espresso pointer-events-none"
          initial={{ scaleY: 0, originY: 1 }}
          animate={{ scaleY: 0, originY: 0 }}
          exit={{ scaleY: 1, originY: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1], // Expo easing for dramatic effect
          }}
        />

        {/* Secondary gold accent overlay */}
        <motion.div
          className="fixed inset-0 z-[99] bg-gradient-to-b from-gold/20 to-espresso pointer-events-none"
          initial={{ scaleY: 1, originY: 0 }}
          animate={{ scaleY: 0, originY: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: [0.76, 0, 0.24, 1],
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

/**
 * Hero image morph transition
 * Use when navigating from a listing card to detail page
 */
export const HeroMorphTransition = ({
  children,
  layoutId,
}: {
  children: ReactNode;
  layoutId: string;
}) => {
  return (
    <motion.div
      layoutId={layoutId}
      className="w-full h-full"
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 30,
        mass: 1,
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
