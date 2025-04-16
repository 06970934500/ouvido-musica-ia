
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Images } from 'lucide-react';

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
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default MusicConceptCard;
