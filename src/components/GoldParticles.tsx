import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 2500;

interface ParticleSystemProps {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

const ParticleSystem = ({ mousePosition }: ParticleSystemProps) => {
  const mesh = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  // Create particle positions and velocities
  const [positions, originalPositions, velocities] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const origPos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Spread particles across the viewport
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      origPos[i3] = x;
      origPos[i3 + 1] = y;
      origPos[i3 + 2] = z;

      // Random velocities for wave effect
      vel[i3] = (Math.random() - 0.5) * 0.01;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    return [pos, origPos, vel];
  }, []);

  // Create sizes for varying particle sizes
  const sizes = useMemo(() => {
    const s = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      s[i] = Math.random() * 0.5 + 0.5;
    }
    return s;
  }, []);

  // Animation loop
  useFrame((state) => {
    if (!mesh.current) return;

    const positionAttribute = mesh.current.geometry.getAttribute('position') as THREE.BufferAttribute;
    const posArray = positionAttribute.array as Float32Array;
    const time = state.clock.getElapsedTime();

    // Convert mouse position to 3D space
    const mouseX = (mousePosition.current.x * 2 - 1) * (viewport.width / 2);
    const mouseY = (-(mousePosition.current.y * 2 - 1)) * (viewport.height / 2);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Wave motion
      const waveX = Math.sin(time * 0.3 + originalPositions[i3] * 0.5) * 0.3;
      const waveY = Math.cos(time * 0.2 + originalPositions[i3 + 1] * 0.5) * 0.4;
      const waveZ = Math.sin(time * 0.4 + originalPositions[i3 + 2] * 0.3) * 0.2;

      // Calculate distance from mouse
      const dx = posArray[i3] - mouseX;
      const dy = posArray[i3 + 1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Repulsion from mouse
      const maxDist = 3;
      let repelX = 0;
      let repelY = 0;

      if (dist < maxDist && dist > 0.01) {
        const force = (maxDist - dist) / maxDist;
        repelX = (dx / dist) * force * 2;
        repelY = (dy / dist) * force * 2;
      }

      // Apply motion
      posArray[i3] = originalPositions[i3] + waveX + repelX;
      posArray[i3 + 1] = originalPositions[i3 + 1] + waveY + repelY;
      posArray[i3 + 2] = originalPositions[i3 + 2] + waveZ;
    }

    positionAttribute.needsUpdate = true;
  });

  // Custom shader material for gold particles
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#D4AF37') }, // Gold
        uColor2: { value: new THREE.Color('#F5E6A3') }, // Light gold
      },
      vertexShader: `
        attribute float size;
        varying float vAlpha;
        varying float vSize;
        
        void main() {
          vSize = size;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          
          // Fade based on depth
          vAlpha = smoothstep(-8.0, 0.0, position.z);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying float vAlpha;
        varying float vSize;
        
        void main() {
          // Circular particle shape
          float dist = distance(gl_PointCoord, vec2(0.5));
          if (dist > 0.5) discard;
          
          // Soft glow
          float alpha = smoothstep(0.5, 0.0, dist) * vAlpha * 0.6;
          
          // Mix colors based on size
          vec3 color = mix(uColor1, uColor2, vSize);
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  // Update time uniform
  useFrame((state) => {
    shaderMaterial.uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <points ref={mesh} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={PARTICLE_COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
    </points>
  );
};

const GoldParticles = () => {
  const mousePosition = useRef({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePosition.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  return (
    <div 
      className="absolute inset-0 z-[5] pointer-events-auto"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
      >
        <ParticleSystem mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default GoldParticles;
