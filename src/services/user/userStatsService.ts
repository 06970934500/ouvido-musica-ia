
import { supabase } from "@/integrations/supabase/client";

// Obter estatísticas gerais do usuário
export const getUserStats = async (userId: string) => {
  try {
    // Obter progresso geral do usuário
    const { data: userProgress, error: userError } = await supabase
      .from('user_progress_summary')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (userError && userError.code !== 'PGRST116') throw userError;
    
    // Obter total de exercícios e taxa de acerto
    const { data: exercises, error: exercisesError } = await supabase
      .from('exercise_progress')
      .select('correct_answers, total_questions')
      .eq('user_id', userId);
    
    if (exercisesError) throw exercisesError;
    
    // Calcular estatísticas
    let totalCorrect = 0;
    let totalQuestions = 0;
    
    if (exercises) {
      exercises.forEach((ex: any) => {
        totalCorrect += ex.correct_answers;
        totalQuestions += ex.total_questions;
      });
    }
    
    // Obter músicas analisadas
    const { count: musicCount, error: musicError } = await supabase
      .from('music_analyses')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);
      
    if (musicError) throw musicError;
    
    return {
      accuracyRate: totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0,
      streakDays: userProgress?.streak_days || 0,
      totalExercises: userProgress?.total_exercises || 0,
      analyzedSongs: musicCount || 0,
      level: calculateUserLevel(totalQuestions, totalCorrect / (totalQuestions || 1))
    };
  } catch (error) {
    console.error("Erro ao obter estatísticas do usuário:", error);
    throw error;
  }
};

// Função para calcular o nível do usuário
const calculateUserLevel = (totalExercises: number, accuracyRate: number): number => {
  if (totalExercises < 10) return 1;
  if (totalExercises < 50) return accuracyRate > 0.7 ? 2 : 1;
  if (totalExercises < 100) return accuracyRate > 0.7 ? 3 : 2;
  if (totalExercises < 200) return accuracyRate > 0.8 ? 4 : 3;
  return accuracyRate > 0.8 ? 5 : 4;
};
