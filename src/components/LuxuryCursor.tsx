import { useEffect, useState, useCallback, useRef } from "react";

const LuxuryCursor = () => {
  const [position, setPosition] = useState({ x: -500, y: -500 });
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Cancel any pending animation frame for performance
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    // Use requestAnimationFrame for smooth 60fps updates
    rafRef.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    });
  }, [isVisible]);

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Golden Spotlight - Large ambient glow that follows cursor instantly */}
      <div
        className="fixed pointer-events-none z-[9998] mix-blend-soft-light"
        style={{
          left: position.x,
          top: position.y,
          width: 500,
          height: 500,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, rgba(212, 175, 55, 0.08) 30%, rgba(212, 175, 55, 0.02) 50%, transparent 70%)`,
          opacity: isVisible ? 1 : 0,
          willChange: 'left, top',
        }}
      />
      
      {/* Secondary warm ambient layer */}
      <div
        className="fixed pointer-events-none z-[9997]"
        style={{
          left: position.x,
          top: position.y,
          width: 300,
          height: 300,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, rgba(245, 230, 163, 0.1) 0%, transparent 60%)`,
          opacity: isVisible ? 1 : 0,
          willChange: 'left, top',
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
          animation: reflectionPulse 1.5s ease-out;
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
            opacity: 0.6;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default LuxuryCursor;