
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

interface AudioPlayerProps {
  audioPath: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}

const AudioPlayer = ({ 
  audioPath, 
  size = 'md', 
  showLabel = false,
  label = 'Ouvir'
}: AudioPlayerProps) => {
  const {
    isPlaying,
    isLoading,
    error,
    play,
    stop
  } = useAudioPlayer(audioPath, {
    volume: 0.8
  });

  // Map sizes to Tailwind classes
  const sizeClasses = {
    sm: "h-9 w-9 rounded-full",
    md: "h-12 w-12 rounded-full",
    lg: "h-20 w-20 rounded-full"
  };

  // Map icon sizes
  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10"
  };

  const handlePlayStop = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Button 
        size="icon"
        className={sizeClasses[size]}
        onClick={handlePlayStop}
        disabled={isLoading || !!error}
        variant={error ? "destructive" : "default"}
      >
        {isLoading ? (
          <Loader2 className={`${iconSizes[size]} animate-spin`} />
        ) : isPlaying ? (
          <VolumeX className={iconSizes[size]} />
        ) : (
          <Volume2 className={iconSizes[size]} />
        )}
      </Button>
      
      {showLabel && (
        <span className="text-sm mt-1">{label}</span>
      )}
      
      {error && (
        <p className="text-xs text-destructive mt-1">Erro ao carregar áudio</p>
      )}
    </div>
  );
};

export default AudioPlayer;
