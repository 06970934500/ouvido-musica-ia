
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Exercise from './Exercise';

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
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => setShowExercise(true)}
        >
          Iniciar Treino
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TrainingModule;
