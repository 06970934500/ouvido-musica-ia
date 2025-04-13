
import { useState, useEffect, useRef } from 'react';

interface UseAudioPlayerOptions {
  onEnded?: () => void;
  volume?: number;
  autoPlay?: boolean;
}

export const useAudioPlayer = (src?: string, options: UseAudioPlayerOptions = {}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(options.volume || 0.5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create or update audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      // Set up event listeners
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
        setIsLoading(false);
      });
      
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });
      
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        if (options.onEnded) options.onEnded();
      });

      audioRef.current.addEventListener('error', (e) => {
        setError('Error loading audio file');
        setIsLoading(false);
        console.error('Audio error:', e);
      });
    }
    
    // Update source
    if (src) {
      setIsLoading(true);
      setError(null);
      audioRef.current.src = src;
      audioRef.current.load();
      
      if (options.autoPlay) {
        play();
      }
    }
    
    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [src]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const play = () => {
    if (audioRef.current) {
      setIsLoading(true);
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      }).catch(error => {
        console.error('Error playing audio:', error);
        setError('Could not play audio');
        setIsLoading(false);
      });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const changeVolume = (newVolume: number) => {
    const normalizedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(normalizedVolume);
  };

  return {
    audioRef,
    isPlaying,
    duration,
    currentTime,
    volume,
    isLoading,
    error,
    play,
    pause,
    toggle,
    stop,
    seek,
    changeVolume
  };
};
