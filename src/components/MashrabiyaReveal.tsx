import { useEffect, useRef } from 'react';

const MashrabiyaReveal = () => {
  const maskRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't run on touch devices
    if ('ontouchstart' in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (maskRef.current) {
        maskRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
        maskRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
      }
      if (patternRef.current) {
        patternRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
        patternRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Mashrabiya pattern layer that gets revealed */}
      <div
        ref={patternRef}
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: `
            radial-gradient(
              circle 300px at var(--mouse-x, 50%) var(--mouse-y, 50%),
              transparent 0%,
              rgba(0, 0, 0, 0.85) 100%
            )
          `,
          opacity: 0.6,
        }}
        aria-hidden="true"
      />

      {/* Enhanced mashrabiya pattern that appears in the light */}
      <div
        ref={maskRef}
        className="fixed inset-0 pointer-events-none z-[2]"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 30px,
                rgba(212, 175, 55, 0.03) 30px,
                rgba(212, 175, 55, 0.03) 31px
              ),
              repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 30px,
                rgba(212, 175, 55, 0.03) 30px,
                rgba(212, 175, 55, 0.03) 31px
              ),
              repeating-linear-gradient(
                45deg,
                transparent 0px,
                transparent 42px,
                rgba(212, 175, 55, 0.02) 42px,
                rgba(212, 175, 55, 0.02) 43px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent 0px,
                transparent 42px,
                rgba(212, 175, 55, 0.02) 42px,
                rgba(212, 175, 55, 0.02) 43px
              )
            `,
            maskImage: `
              radial-gradient(
                circle 350px at var(--mouse-x, 50%) var(--mouse-y, 50%),
                black 0%,
                black 30%,
                transparent 70%
              )
            `,
            WebkitMaskImage: `
              radial-gradient(
                circle 350px at var(--mouse-x, 50%) var(--mouse-y, 50%),
                black 0%,
                black 30%,
                transparent 70%
              )
            `,
          }}
        />
      </div>

      {/* Subtle vignette around mouse for depth */}
      <div
        className="fixed inset-0 pointer-events-none z-[3]"
        style={{
          background: `
            radial-gradient(
              circle 200px at var(--mouse-x, 50%) var(--mouse-y, 50%),
              rgba(212, 175, 55, 0.04) 0%,
              transparent 100%
            )
          `,
        }}
        aria-hidden="true"
      />

      <style>{`
        :root {
          --mouse-x: 50%;
          --mouse-y: 50%;
        }
      `}</style>
    </>
  );
};

export default MashrabiyaReveal;
