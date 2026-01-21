import { useEffect, useRef } from 'react';

const FilmGrain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let animationId: number;
    let lastFrame = 0;
    const fps = 24; // Film-like frame rate
    const frameInterval = 1000 / fps;

    const renderGrain = (timestamp: number) => {
      animationId = requestAnimationFrame(renderGrain);

      // Limit frame rate for authentic film feel
      if (timestamp - lastFrame < frameInterval) return;
      lastFrame = timestamp;

      const width = canvas.width;
      const height = canvas.height;
      
      // Create grain pattern
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        // Random grain value
        const grain = Math.random() * 35;
        
        // Apply warm-tinted grain (slight sepia)
        data[i] = grain + 5;     // R (slightly warmer)
        data[i + 1] = grain + 2; // G
        data[i + 2] = grain;     // B
        data[i + 3] = grain * 0.4; // Alpha (subtle)
      }

      ctx.putImageData(imageData, 0, 0);
    };

    animationId = requestAnimationFrame(renderGrain);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        mixBlendMode: 'overlay',
        opacity: 0.04,
      }}
      aria-hidden="true"
    />
  );
};

export default FilmGrain;
