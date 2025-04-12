
interface Chord {
  time: number;
  chord: string;
}

interface ChordTimelineProps {
  chords: Chord[];
  currentTime: number;
  totalDuration: number;
}

const ChordTimeline = ({ chords, currentTime, totalDuration }: ChordTimelineProps) => {
  // Calculate width percentages for each segment
  const getSegments = () => {
    return chords.map((chord, index) => {
      const nextChordTime = index < chords.length - 1 
        ? chords[index + 1].time 
        : totalDuration;
      
      const duration = nextChordTime - chord.time;
      const widthPercent = (duration / totalDuration) * 100;
      
      const isActive = currentTime >= chord.time && currentTime < nextChordTime;
      
      return {
        chord,
        widthPercent,
        isActive
      };
    });
  };

  const segments = getSegments();

  return (
    <div className="w-full h-12 flex">
      {segments.map((segment, index) => (
        <div 
          key={index}
          className={`h-full flex items-center justify-center border-r last:border-r-0 font-medium transition-colors ${
            segment.isActive 
              ? "bg-music-100 text-music-800" 
              : "bg-muted/30 text-muted-foreground"
          }`}
          style={{ width: `${segment.widthPercent}%` }}
        >
          {segment.chord.chord}
        </div>
      ))}
    </div>
  );
};

export default ChordTimeline;
