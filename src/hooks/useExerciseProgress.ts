
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { saveExerciseProgress } from '@/services/progressoService';

type ExerciseType = 'intervalos' | 'acordes' | 'progressoes' | 'melodias';
type Difficulty = 'iniciante' | 'intermediario' | 'avancado';

export const useExerciseProgress = (exerciseType: ExerciseType, difficulty: Difficulty) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(false);

  const recordAnswer = async (isCorrect: boolean) => {
    // Atualizar contadores locais
    setTotalQuestions(prev => prev + 1);
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const submitExerciseResult = async () => {
    if (!user || totalQuestions === 0) return;

    try {
      setLoading(true);
      
      await saveExerciseProgress({
        user_id: user.id,
        exercise_type: exerciseType,
        difficulty: difficulty,
        correct_answers: correctAnswers,
        total_questions: totalQuestions,
        completed_at: new Date()
      });
      
      toast({
        title: "Progresso salvo",
        description: `Taxa de acerto: ${Math.round((correctAnswers / totalQuestions) * 100)}%`,
      });
      
      // Resetar contadores
      setCorrectAnswers(0);
      setTotalQuestions(0);
    } catch (error) {
      console.error("Erro ao salvar progresso:", error);
      toast({
        title: "Erro ao salvar progresso",
        description: "Não foi possível salvar seu progresso. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    correctAnswers,
    totalQuestions,
    loading,
    recordAnswer,
    submitExerciseResult,
    accuracyRate: totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0
  };
};
