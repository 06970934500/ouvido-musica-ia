
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Images, Volume2 } from 'lucide-react';
import AudioPlayer from "@/components/training/AudioPlayer";

interface MusicConceptCardProps {
  name: string;
  placeholderImage: string;
  description: string;
}

const MusicConceptCard = ({ name, placeholderImage, description }: MusicConceptCardProps) => {
  // Map concept names to the correct image paths
  const getConceptImage = (conceptName: string) => {
    switch(conceptName) {
      case 'Intervalos':
        return "/lovable-uploads/81b7b9fa-54b7-412c-9092-bcf0c52a42c6.png";
      case 'Escalas':
        return "/lovable-uploads/9bdc3702-7be6-4236-8de3-894bf3e0cc02.png";
      case 'Acordes':
        return "/lovable-uploads/52a2c01c-5c0a-421f-996e-5b53368e9b07.png";
      default:
        return placeholderImage;
    }
  };

  // Map concept names to example audio paths
  const getConceptAudio = (conceptName: string) => {
    switch(conceptName) {
      case 'Intervalos':
        return "/audio/intervals/5ªjusta.mp3";
      case 'Escalas':
        return "/audio/demo/example.mp3";
      case 'Acordes':
        return "/audio/chords/maior.mp3";
      default:
        return "";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <Images className="h-12 w-12 text-music-600" />
        </div>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <img 
          src={getConceptImage(name)} 
          alt={name} 
          className="mx-auto mb-4 rounded-lg shadow-sm max-h-48"
        />
        <p className="text-muted-foreground mb-4">{description}</p>
        
        {/* Audio example section */}
        <div className="flex flex-col items-center mt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Volume2 className="h-4 w-4" />
            <span>Escutar exemplo:</span>
          </div>
          <AudioPlayer 
            audioPath={getConceptAudio(name)}
            size="sm"
            showLabel={false}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicConceptCard;
