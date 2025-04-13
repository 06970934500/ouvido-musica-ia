
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Music, Volume2, VolumeX, Check, X, RefreshCw, Loader2 } from 'lucide-react';
import { useExerciseProgress } from '@/hooks/useExerciseProgress';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useToast } from '@/hooks/use-toast';

// Temporary mapping for audio files - in a real app, these would come from a backend
const AUDIO_SAMPLES = {
  // Intervals
  'Uníssono': '/audio/intervals/unison.mp3',
  '2ª menor': '/audio/intervals/minor2nd.mp3',
  '2ª maior': '/audio/intervals/major2nd.mp3',
  '3ª menor': '/audio/intervals/minor3rd.mp3',
  '3ª maior': '/audio/intervals/major3rd.mp3',
  '4ª justa': '/audio/intervals/perfect4th.mp3',
  '5ª justa': '/audio/intervals/perfect5th.mp3',
  '6ª menor': '/audio/intervals/minor6th.mp3',
  '6ª maior': '/audio/intervals/major6th.mp3',
  '7ª menor': '/audio/intervals/minor7th.mp3',
  '7ª maior': '/audio/intervals/major7th.mp3',
  '8ª (oitava)': '/audio/intervals/octave.mp3',
  
  // Chords
  'Maior': '/audio/chords/major.mp3',
  'Menor': '/audio/chords/minor.mp3',
  'Diminuto': '/audio/chords/diminished.mp3',
  'Aumentado': '/audio/chords/augmented.mp3',
  'Maior com 7ª': '/audio/chords/major7.mp3',
  'Dominante (7)': '/audio/chords/dominant7.mp3',
  'Menor com 7ª': '/audio/chords/minor7.mp3',
  'Meio-diminuto': '/audio/chords/half-diminished.mp3',
  
  // Progressions
  'I - IV - V': '/audio/progressions/I-IV-V.mp3',
  'I - vi - IV - V': '/audio/progressions/I-vi-IV-V.mp3',
  'I - V - vi - IV': '/audio/progressions/I-V-vi-IV.mp3',
  'ii - V - I': '/audio/progressions/ii-V-I.mp3',
  'I - vi - ii - V': '/audio/progressions/I-vi-ii-V.mp3',
  'iii - vi - ii - V': '/audio/progressions/iii-vi-ii-V.mp3',
  'I - IV - iii - vi - ii - V - I': '/audio/progressions/I-IV-iii-vi-ii-V-I.mp3',
};

// Fallback audio for demo purposes
const FALLBACK_AUDIO = 'https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3';

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
  const [currentExercise, setCurrentExercise] = useState(1);
  const [totalExercises, setTotalExercises] = useState(10);
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);
  const { toast } = useToast();
  
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

  // Generate new exercise
  const generateNewExercise = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    
    // Select a random correct option
    const newCorrectOption = options[Math.floor(Math.random() * options.length)];
    setCorrectOption(newCorrectOption);
    
    // Get the audio URL for this option
    const audioPath = AUDIO_SAMPLES[newCorrectOption as keyof typeof AUDIO_SAMPLES] || FALLBACK_AUDIO;
    setAudioUrl(audioPath);
  };

  // Initialize on mount
  useEffect(() => {
    generateNewExercise();
  }, []);

  // Handle error
  useEffect(() => {
    if (error) {
      toast({
        title: "Erro ao carregar áudio",
        description: "Usando um áudio de demonstração",
        variant: "destructive"
      });
      
      // Use fallback audio
      setAudioUrl(FALLBACK_AUDIO);
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
              disabled={selectedOption !== null || isLoading}
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
