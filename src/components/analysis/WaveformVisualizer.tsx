
import { useEffect, useState } from "react";

interface WaveformVisualizerProps {
  currentTime: number;
  totalDuration: number;
}

const WaveformVisualizer = ({ currentTime, totalDuration }: WaveformVisualizerProps) => {
  const [bars, setBars] = useState<number[]>([]);
  
  useEffect(() => {
    // Generate random waveform for demo
    const generateWaveform = () => {
      const barCount = 100;
      const randomBars = Array.from({ length: barCount }, () => Math.random() * 100);
      setBars(randomBars);
    };
    
    generateWaveform();
  }, []);

  // Calculate position
  const position = (currentTime / totalDuration) * 100;

  return (
    <div className="w-full h-32 relative">
      <div className="absolute inset-0 flex items-end space-x-0.5">
        {bars.map((height, index) => {
          const isActive = (index / bars.length) * 100 <= position;
          
          return (
            <div 
              key={index} 
              className="flex-1"
              style={{ height: `${Math.max(5, height)}%` }}
            >
              <div 
                className={`w-full h-full rounded-sm transition-colors ${
                  isActive ? "bg-music-500" : "bg-muted-foreground/30"
                }`}
              ></div>
            </div>
          );
        })}
      </div>
      
      <div 
        className="absolute top-0 w-px h-full bg-music-600 z-10"
        style={{ left: `${position}%` }}
      ></div>
    </div>
  );
};

export default WaveformVisualizer;
