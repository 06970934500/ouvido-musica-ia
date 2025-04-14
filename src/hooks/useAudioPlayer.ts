
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

  // Função para obter a URL pública do Supabase Storage
  const getSupabaseUrl = async (path: string): Promise<string | null> => {
    // Se já for uma URL completa, retorne-a
    if (path.startsWith('http')) {
      return path;
    }
    
    // Se começar com "/audio/", assume que é um caminho para o bucket do Supabase
    if (path.startsWith('/audio/')) {
      const filePath = path.replace('/audio/', '');
      try {
        const { data } = await supabase.storage
          .from('audio_exercises')
          .getPublicUrl(filePath);

        return data.publicUrl;
      } catch (err) {
        console.error('Erro ao obter URL do Supabase:', err);
        return null;
      }
    }
    
    // Se não for nenhum dos casos acima, retorne o próprio path
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
        setError('Erro ao carregar arquivo de áudio');
        setIsLoading(false);
        console.error('Erro de áudio:', e);
      });
    }
    
    // Update source
    if (src) {
      setIsLoading(true);
      setError(null);
      
      // Obter URL do Supabase se necessário
      getSupabaseUrl(src).then(url => {
        if (url && audioRef.current) {
          setAudioUrl(url);
          audioRef.current.src = url;
          audioRef.current.load();
          
          if (options.autoPlay) {
            play();
          }
        } else {
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
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      }).catch(error => {
        console.error('Erro ao reproduzir áudio:', error);
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
