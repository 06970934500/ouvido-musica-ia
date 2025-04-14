
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Upload } from 'lucide-react';
import Exercise from './Exercise';
import { useAuth } from '@/hooks/useAuth';
import AudioUploader from '../admin/AudioUploader';

interface TrainingModuleProps {
  title: string;
  description: string;
  items: string[];
  exerciseType: 'intervalos' | 'acordes' | 'progressoes' | 'melodias';
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
}

const TrainingModule = ({
  title,
  description,
  items,
  exerciseType,
  difficulty
}: TrainingModuleProps) => {
  const [showExercise, setShowExercise] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const { user } = useAuth();
  
  // Verificação simples para modo admin (na prática, você teria um controle mais rigoroso)
  const isAdmin = user?.email === 'admin@example.com'; // Substitua por sua lógica real de verificação de admin

  const handleUploadComplete = (audioPath: string) => {
    console.log(`Áudio carregado para ${exerciseType}/${difficulty}: ${audioPath}`);
    // Aqui você poderia atualizar a lista de itens com o novo áudio, etc.
  };

  return showExercise ? (
    <Exercise 
      title={`Exercício de ${title}`}
      description={`Escute o som e selecione a resposta correta`}
      options={items.length > 4 ? items.slice(0, 4) : items}
      exerciseType={exerciseType}
      difficulty={difficulty}
      onComplete={() => setShowExercise(false)}
    />
  ) : (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        
        {isAdmin && showUploader && (
          <div className="mt-6 border-t pt-4">
            <h4 className="font-medium mb-3">Upload de Áudios</h4>
            <div className="space-y-4">
              {items.map((item, index) => (
                <AudioUploader
                  key={index}
                  exerciseId={`${exerciseType}_${difficulty}_${index}`}
                  audioType={exerciseType === 'intervalos' ? 'interval' : 
                             exerciseType === 'acordes' ? 'chord' : 
                             exerciseType === 'progressoes' ? 'progression' : 'melody'}
                  label={item}
                  onUploadComplete={handleUploadComplete}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          className="w-full" 
          onClick={() => setShowExercise(true)}
        >
          Iniciar Treino
        </Button>
        
        {isAdmin && (
          <Button 
            variant="outline"
            className="ml-2"
            onClick={() => setShowUploader(!showUploader)}
          >
            <Upload className="h-4 w-4 mr-2" />
            {showUploader ? "Esconder Upload" : "Gerenciar Áudios"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TrainingModule;
