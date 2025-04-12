
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Music, Volume2, VolumeX, Check, X, RefreshCw } from 'lucide-react';
import { useExerciseProgress } from '@/hooks/useExerciseProgress';

interface ExerciseProps {
  title: string;
  description: string;
  options: string[];
  exerciseType: 'intervalos' | 'acordes' | 'progressoes' | 'melodias';
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
  onComplete?: () => void;
}

const Exercise = ({
  title,
  description,
  options,
  exerciseType,
  difficulty,
  onComplete,
}: ExerciseProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctOption, setCorrectOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(1);
  const [totalExercises, setTotalExercises] = useState(10);
  
  const {
    correctAnswers,
    totalQuestions,
    loading,
    recordAnswer,
    submitExerciseResult,
    accuracyRate
  } = useExerciseProgress(exerciseType, difficulty);

  // Gerar novo exercício
  const generateNewExercise = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setCorrectOption(options[Math.floor(Math.random() * options.length)]);
    setIsPlaying(false);
  };

  // Iniciar ao montar
  useEffect(() => {
    generateNewExercise();
  }, []);

  // Verificar resposta
  const checkAnswer = (option: string) => {
    // Bloquear se já respondeu ou está carregando
    if (selectedOption || loading) return;
    
    setSelectedOption(option);
    const correct = option === correctOption;
    setIsCorrect(correct);
    recordAnswer(correct);
    
    // Se completou todos os exercícios, enviar resultado
    if (currentExercise >= totalExercises) {
      submitExerciseResult().then(() => {
        if (onComplete) onComplete();
      });
    }
  };

  // Ir para próximo exercício
  const nextExercise = () => {
    if (currentExercise < totalExercises) {
      setCurrentExercise(prev => prev + 1);
      generateNewExercise();
    } else {
      // Reiniciar exercícios
      setCurrentExercise(1);
      generateNewExercise();
    }
  };

  // Simular reprodução de áudio
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Aqui você adicionaria a lógica para tocar o som real
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge variant="outline">
            Exercício {currentExercise} de {totalExercises}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progresso */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progresso</span>
            <span>{Math.round((currentExercise - 1) / totalExercises * 100)}%</span>
          </div>
          <Progress value={(currentExercise - 1) / totalExercises * 100} className="h-2" />
        </div>
        
        {/* Controles de áudio */}
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="rounded-full h-20 w-20"
            onClick={togglePlay}
            disabled={isPlaying}
          >
            {isPlaying ? (
              <VolumeX className="h-10 w-10" />
            ) : (
              <Volume2 className="h-10 w-10" />
            )}
          </Button>
        </div>
        
        {/* Opções */}
        <div className="grid grid-cols-2 gap-3">
          {options.map((option) => (
            <Button
              key={option}
              size="lg"
              variant={selectedOption === option 
                ? (option === correctOption ? "default" : "destructive") 
                : "outline"}
              className={`h-16 ${
                selectedOption === option && option === correctOption ? "bg-green-500 hover:bg-green-600" : ""
              }`}
              onClick={() => checkAnswer(option)}
              disabled={selectedOption !== null}
            >
              {selectedOption === option && (
                option === correctOption 
                ? <Check className="h-5 w-5 mr-2" /> 
                : <X className="h-5 w-5 mr-2" />
              )}
              {option}
            </Button>
          ))}
        </div>
        
        {/* Feedback */}
        {isCorrect !== null && (
          <div className={`text-center p-3 rounded-md ${
            isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {isCorrect 
              ? "Correto! Ótimo trabalho!" 
              : `Incorreto. A resposta correta era: ${correctOption}`}
          </div>
        )}
        
        {/* Taxa de acerto atual */}
        {totalQuestions > 0 && (
          <div className="text-center text-sm text-muted-foreground">
            Taxa de acerto atual: <span className="font-medium">{accuracyRate}%</span> 
            ({correctAnswers} de {totalQuestions})
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={togglePlay}
          disabled={isPlaying}
        >
          <Music className="h-4 w-4 mr-2" />
          Ouvir novamente
        </Button>
        
        {selectedOption && (
          <Button onClick={nextExercise}>
            {currentExercise >= totalExercises ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Recomeçar
              </>
            ) : (
              "Próximo"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Exercise;
