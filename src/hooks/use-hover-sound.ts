import { useCallback } from 'react';
import { useAudio } from '@/components/AudioProvider';

export const useHoverSound = () => {
  const { playHoverSound } = useAudio();

  const onMouseEnter = useCallback(() => {
    playHoverSound();
  }, [playHoverSound]);

  return { onMouseEnter };
};

export default useHoverSound;
