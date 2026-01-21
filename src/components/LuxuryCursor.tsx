import { useEffect, useRef } from "react";

const LuxuryCursor = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const innerGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't run on touch devices
    if ('ontouchstart' in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Direct DOM manipulation for maximum performance - no React state updates
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
        spotlightRef.current.style.opacity = '1';
      }
      if (innerGlowRef.current) {
        innerGlowRef.current.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
        innerGlowRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      if (spotlightRef.current) spotlightRef.current.style.opacity = '0';
      if (innerGlowRef.current) innerGlowRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Golden Spotlight - Large ambient glow, instant tracking via transform */}
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-soft-light"
        style={{
          width: 500,
          height: 500,
          background: `radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, rgba(212, 175, 55, 0.08) 30%, rgba(212, 175, 55, 0.02) 50%, transparent 70%)`,
          opacity: 0,
          willChange: 'transform',
        }}
      />
      
      {/* Secondary warm inner glow */}
      <div
        ref={innerGlowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          width: 300,
          height: 300,
          background: `radial-gradient(circle, rgba(245, 230, 163, 0.12) 0%, transparent 60%)`,
          opacity: 0,
          willChange: 'transform',
        }}
      />

      {/* Global styles for interactive reflections */}
      <style>{`
        /* Restore default cursor for usability */
        * {
          cursor: auto !important;
        }
        
        a, button, [role="button"], .cursor-pointer {
          cursor: pointer !important;
        }
        
        /* Interactive reflection effect on buttons */
        button:hover::after,
        [role="button"]:hover::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(245, 230, 163, 0.15) 0%,
            rgba(212, 175, 55, 0.08) 30%,
            transparent 60%
          );
          pointer-events: none;
          border-radius: inherit;
          animation: reflectionPulse 1.5s ease-out forwards;
        }
        
        /* Interactive reflection on property cards */
        article:hover .card-reflection,
        .group:hover .card-reflection {
          opacity: 1;
        }
        
        @keyframes reflectionPulse {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.7;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default LuxuryCursor;