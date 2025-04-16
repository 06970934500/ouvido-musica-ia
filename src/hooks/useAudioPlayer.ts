
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // Function to get public URL from Supabase Storage
  const getSupabaseUrl = async (path: string): Promise<string | null> => {
    // If already a full URL, return it
    if (path.startsWith('http')) {
      return path;
    }
    
    // If path starts with "/audio/", assume it's a path to a public file
    if (path.startsWith('/audio/')) {
      // Just use the path directly since these are public files
      return path;
    }
    
    // If none of the above, return the path itself
    return path;
  };

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
        console.error('Audio error event:', e);
        setError('Erro ao carregar arquivo de áudio');
        setIsLoading(false);
      });
    }
    
    // Update source
    if (src) {
      setIsLoading(true);
      setError(null);
      console.log('Loading audio from path:', src);
      
      // Get URL from Supabase if needed
      getSupabaseUrl(src).then(url => {
        if (url && audioRef.current) {
          setAudioUrl(url);
          audioRef.current.src = url;
          audioRef.current.load();
          console.log('Audio loaded with URL:', url);
          
          if (options.autoPlay) {
            play();
          }
        } else {
          console.error('Could not get audio URL for path:', src);
          setError('Não foi possível carregar o arquivo de áudio');
          setIsLoading(false);
        }
      });
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
      console.log('Attempting to play audio');
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsLoading(false);
        console.log('Audio playing successfully');
      }).catch(error => {
        console.error('Error playing audio:', error);
        setError('Não foi possível reproduzir o áudio');
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
    audioUrl,
    play,
    pause,
    toggle,
    stop,
    seek,
    changeVolume
  };
};
