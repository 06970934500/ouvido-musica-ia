
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Images } from 'lucide-react';

interface MusicConceptCardProps {
  name: string;
  placeholderImage: string;
  description: string;
}

const MusicConceptCard = ({ name, placeholderImage, description }: MusicConceptCardProps) => {
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
          src={placeholderImage} 
          alt={name} 
          className="mx-auto mb-4 rounded-lg shadow-sm max-h-48"
        />
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default MusicConceptCard;
