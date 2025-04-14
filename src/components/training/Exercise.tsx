
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Music, Volume2, VolumeX, Check, X, RefreshCw, Loader2 } from 'lucide-react';
import { useExerciseProgress } from '@/hooks/useExerciseProgress';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Interface para as opções do exercício
interface ExerciseOption {
  label: string;
  audioPath?: string;
  isCorrect?: boolean;
}

interface ExerciseProps {
  title: string;
  description: string;
  options: string[] | ExerciseOption[];
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
  const [currentExercise, setCurrentExercise] = useState(1);
  const [totalExercises, setTotalExercises] = useState(10);
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);
  const [currentOptions, setCurrentOptions] = useState<ExerciseOption[]>([]);
  const { toast } = useToast();
  
  // Tratar opções no formato de string ou objeto
  useEffect(() => {
    // Converter as opções para o formato padronizado (objeto ExerciseOption)
    const formattedOptions = options.map(opt => {
      if (typeof opt === 'string') {
        return { label: opt };
      }
      return opt as ExerciseOption;
    });
    
    setCurrentOptions(formattedOptions);
  }, [options]);
  
  const {
    correctAnswers,
    totalQuestions,
    loading,
    recordAnswer,
    submitExerciseResult,
    accuracyRate
  } = useExerciseProgress(exerciseType, difficulty);

  const {
    isPlaying,
    isLoading,
    error,
    play,
    stop
  } = useAudioPlayer(audioUrl, {
    volume: 0.8,
    onEnded: () => {
      // Audio completed playing
    }
  });

  // Buscar exercícios do Supabase
  const fetchExerciseContent = async () => {
    try {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('type', exerciseType.replace('intervalos', 'interval').replace('acordes', 'chord').replace('progressoes', 'progression'))
        .eq('difficulty', difficulty.replace('iniciante', 'beginner').replace('intermediario', 'intermediate').replace('avancado', 'advanced'))
        .limit(1)
        .single();
      
      if (error) {
        console.error("Erro ao buscar exercício:", error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error("Erro na consulta:", error);
      return null;
    }
  };

  // Generate new exercise
  const generateNewExercise = async () => {
    setSelectedOption(null);
    setIsCorrect(null);
    
    // Tente buscar exercício da base de dados
    const exerciseData = await fetchExerciseContent();
    
    if (exerciseData && exerciseData.content) {
      // Usar dados do exercício se disponível
      // Implementação futura
    }
    
    // Selecionar uma opção aleatória como correta
    const randomIndex = Math.floor(Math.random() * currentOptions.length);
    const newCorrectOption = currentOptions[randomIndex].label;
    setCorrectOption(newCorrectOption);
    
    // Obter o caminho de áudio da opção correta ou usar fallback
    const correctOptionData = currentOptions.find(opt => opt.label === newCorrectOption);
    const audioPath = correctOptionData?.audioPath;
    
    // Se tiver um caminho de áudio específico, use-o
    if (audioPath) {
      setAudioUrl(audioPath);
    } else {
      // Caso contrário, use o áudio padrão baseado no tipo e na opção
      let fallbackPath = '';
      
      switch (exerciseType) {
        case 'intervalos':
          fallbackPath = `/audio/intervals/${newCorrectOption.toLowerCase().replace(/\s+/g, '')}.mp3`;
          break;
        case 'acordes':
          fallbackPath = `/audio/chords/${newCorrectOption.toLowerCase().replace(/\s+/g, '')}.mp3`;
          break;
        case 'progressoes':
          fallbackPath = `/audio/progressions/${newCorrectOption.toLowerCase().replace(/\s+/g, '-')}.mp3`;
          break;
        default:
          // Áudio de demonstração genérico
          fallbackPath = 'https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3';
      }
      
      setAudioUrl(fallbackPath);
    }
  };

  // Initialize on mount
  useEffect(() => {
    generateNewExercise();
  }, [currentOptions]);

  // Handle error
  useEffect(() => {
    if (error) {
      toast({
        title: "Erro ao carregar áudio",
        description: "Usando um áudio de demonstração",
        variant: "destructive"
      });
      
      // Use fallback audio
      setAudioUrl('https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3');
    }
  }, [error]);

  // Check answer
  const checkAnswer = (option: string) => {
    // Block if already answered or loading
    if (selectedOption || loading) return;
    
    setSelectedOption(option);
    const correct = option === correctOption;
    setIsCorrect(correct);
    recordAnswer(correct);
    
    // Stop audio
    stop();
    
    // If completed all exercises, send result
    if (currentExercise >= totalExercises) {
      submitExerciseResult().then(() => {
        if (onComplete) onComplete();
      });
    }
  };

  // Go to next exercise
  const nextExercise = () => {
    if (currentExercise < totalExercises) {
      setCurrentExercise(prev => prev + 1);
      generateNewExercise();
    } else {
      // Restart exercises
      setCurrentExercise(1);
      generateNewExercise();
    }
  };

  // Play audio
  const handlePlayAudio = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
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
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progresso</span>
            <span>{Math.round((currentExercise - 1) / totalExercises * 100)}%</span>
          </div>
          <Progress value={(currentExercise - 1) / totalExercises * 100} className="h-2" />
        </div>
        
        {/* Audio controls */}
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="rounded-full h-20 w-20"
            onClick={handlePlayAudio}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-10 w-10 animate-spin" />
            ) : isPlaying ? (
              <VolumeX className="h-10 w-10" />
            ) : (
              <Volume2 className="h-10 w-10" />
            )}
          </Button>
        </div>
        
        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {currentOptions.map((option) => (
            <Button
              key={option.label}
              size="lg"
              variant={selectedOption === option.label 
                ? (option.label === correctOption ? "default" : "destructive") 
                : "outline"}
              className={`h-16 ${
                selectedOption === option.label && option.label === correctOption ? "bg-green-500 hover:bg-green-600" : ""
              }`}
              onClick={() => checkAnswer(option.label)}
              disabled={selectedOption !== null || isLoading}
            >
              {selectedOption === option.label && (
                option.label === correctOption 
                ? <Check className="h-5 w-5 mr-2" /> 
                : <X className="h-5 w-5 mr-2" />
              )}
              {option.label}
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
        
        {/* Current accuracy rate */}
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
          onClick={handlePlayAudio}
          disabled={isLoading}
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
