import { createContext, useContext, useState, useCallback, useRef, useEffect, ReactNode } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playHoverSound: () => void;
  playClickSound: () => void;
}

const AudioContext = createContext<AudioContextType>({
  isMuted: true,
  toggleMute: () => {},
  playHoverSound: () => {},
  playClickSound: () => {},
});

export const useAudio = () => {
  return useContext(AudioContext);
};

// Create oscillator-based sounds (no external files needed)
const createAudioContext = () => {
  return new (window.AudioContext || (window as any).webkitAudioContext)();
};

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [audioReady, setAudioReady] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambientSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const ambientIntervalRef = useRef<number | null>(null);

  // Initialize audio context on first user interaction
  const initAudio = useCallback(() => {
    if (audioContextRef.current) return;
    
    try {
      audioContextRef.current = createAudioContext();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = 0;
      setAudioReady(true);
    } catch (e) {
      console.log('Audio initialization failed');
    }
  }, []);

  // Create ambient drone sound
  const createAmbientDrone = useCallback(() => {
    if (!audioContextRef.current || !gainNodeRef.current) return;
    
    const ctx = audioContextRef.current;
    
    // Create multiple oscillators for rich ambient sound
    const oscillators: OscillatorNode[] = [];
    const frequencies = [55, 110, 82.5]; // Low drone frequencies
    
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      oscGain.gain.value = 0.03 - (i * 0.008); // Decreasing volume for harmonics
      
      osc.connect(oscGain);
      oscGain.connect(gainNodeRef.current!);
      osc.start();
      
      oscillators.push(osc);
    });

    // Add subtle wind noise
    const noiseLength = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, noiseLength, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < noiseLength; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * 0.02;
    }
    
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;
    
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 400;
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.15;
    
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(gainNodeRef.current);
    noiseSource.start();

    return () => {
      oscillators.forEach(osc => {
        osc.stop();
        osc.disconnect();
      });
      noiseSource.stop();
      noiseSource.disconnect();
    };
  }, []);

  // Crystal ding sound for hover
  const playHoverSound = useCallback(() => {
    if (isMuted || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2093, ctx.currentTime); // C7 - crystal high
    osc.frequency.exponentialRampToValueAtTime(1568, ctx.currentTime + 0.1); // G6
    
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  }, [isMuted]);

  // Click sound
  const playClickSound = useCallback(() => {
    if (isMuted || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  }, [isMuted]);

  // Toggle mute and handle ambient audio
  const toggleMute = useCallback(() => {
    initAudio();
    
    setIsMuted(prev => {
      const newMuted = !prev;
      
      if (gainNodeRef.current && audioContextRef.current) {
        const ctx = audioContextRef.current;
        
        if (newMuted) {
          // Fade out
          gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
        } else {
          // Resume context if suspended
          if (ctx.state === 'suspended') {
            ctx.resume();
          }
          // Fade in
          gainNodeRef.current.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.5);
        }
      }
      
      return newMuted;
    });
  }, [initAudio]);

  // Start ambient when unmuted
  useEffect(() => {
    if (!isMuted && audioReady) {
      const cleanup = createAmbientDrone();
      return cleanup;
    }
  }, [isMuted, audioReady, createAmbientDrone]);

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, playHoverSound, playClickSound }}>
      {children}
    </AudioContext.Provider>
  );
};

// Audio Toggle Button Component
export const AudioToggle = () => {
  const { isMuted, toggleMute } = useAudio();

  return (
    <motion.button
      onClick={toggleMute}
      className="relative w-10 h-10 flex items-center justify-center rounded-full border border-gold/30 bg-espresso/50 backdrop-blur-sm text-gold hover:border-gold/60 hover:bg-espresso/70 transition-all"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
    >
      <AnimatePresence mode="wait">
        {isMuted ? (
          <motion.div
            key="muted"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <VolumeX size={18} strokeWidth={1.5} />
          </motion.div>
        ) : (
          <motion.div
            key="unmuted"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <Volume2 size={18} strokeWidth={1.5} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Pulsing ring when audio is on */}
      {!isMuted && (
        <motion.div
          className="absolute inset-0 rounded-full border border-gold/40"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
};

export default AudioProvider;
