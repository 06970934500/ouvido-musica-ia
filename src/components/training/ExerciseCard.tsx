
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Volume2, Check, X, RefreshCw } from "lucide-react";

interface ExerciseCardProps {
  title: string;
  description: string;
  options: string[];
}

const ExerciseCard = ({ title, description, options }: ExerciseCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Simulate playing sound
  const playSound = () => {
    setIsPlaying(true);
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

  // Simulate checking answer (random result for demo)
  const checkAnswer = (option: string) => {
    setSelectedOption(option);
    setResult(Math.random() > 0.5 ? "correct" : "incorrect");
  };

  // Reset exercise
  const resetExercise = () => {
    setSelectedOption(null);
    setResult(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge variant={isPlaying ? "default" : "outline"} className="ml-auto">
            {isPlaying ? "Tocando..." : "Pronto"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <Button 
            onClick={playSound} 
            size="lg" 
            className="rounded-full w-16 h-16"
            disabled={isPlaying}
          >
            <Volume2 className={`h-6 w-6 ${isPlaying ? "animate-pulse" : ""}`} />
            <span className="sr-only">Tocar som</span>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {options.map((option) => (
            <Button
              key={option}
              variant={selectedOption === option ? (result === "correct" ? "default" : "destructive") : "outline"}
              className="h-12"
              onClick={() => checkAnswer(option)}
              disabled={result !== null}
            >
              {selectedOption === option && result === "correct" && (
                <Check className="h-4 w-4 mr-2" />
              )}
              {selectedOption === option && result === "incorrect" && (
                <X className="h-4 w-4 mr-2" />
              )}
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {result === "correct" && "Correto! Ótimo trabalho."}
          {result === "incorrect" && "Incorreto. Tente novamente."}
          {result === null && "Escute o som e selecione a resposta correta."}
        </div>
        {result !== null && (
          <Button variant="ghost" size="sm" onClick={resetExercise}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Próximo
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ExerciseCard;
