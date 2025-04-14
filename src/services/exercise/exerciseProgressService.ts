
import { supabase } from "@/integrations/supabase/client";
import { ExerciseProgress } from "@/types/progresso";

// Salvar o progresso de um exercício
export const saveExerciseProgress = async (progress: Omit<ExerciseProgress, 'id' | 'created_at'>) => {
  try {
    // Converter para o formato correto
    const dataToInsert = {
      user_id: progress.user_id,
      exercise_type: progress.exercise_type,
      difficulty: progress.difficulty,
      correct_answers: progress.correct_answers,
      total_questions: progress.total_questions,
      completed_at: progress.completed_at.toISOString()
    };

    const { data, error } = await supabase
      .from('exercise_progress')
      .insert(dataToInsert)
      .select();
    
    if (error) throw error;
    
    // Atualizar o progresso geral do usuário
    await updateUserProgress(progress.user_id);
    
    return data;
  } catch (error) {
    console.error("Erro ao salvar progresso do exercício:", error);
    throw error;
  }
};

// Atualizar ou criar o progresso geral do usuário
const updateUserProgress = async (userId: string) => {
  try {
    // Verificar se o usuário já tem um registro de progresso
    const { data: existingProgress, error: fetchError } = await supabase
      .from('user_progress_summary')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (existingProgress) {
      // Verificar se o último acesso foi no dia anterior
      const lastActivity = new Date(existingProgress.last_activity_date);
      lastActivity.setHours(0, 0, 0, 0);
      
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      
      const streakDays = lastActivity.getTime() === yesterday.getTime() 
        ? existingProgress.streak_days + 1 
        : (lastActivity.getTime() === today.getTime() ? existingProgress.streak_days : 1);
      
      // Atualizar o progresso existente
      const { error: updateError } = await supabase
        .from('user_progress_summary')
        .update({
          streak_days: streakDays,
          total_exercises: existingProgress.total_exercises + 1,
          last_activity_date: today.toISOString()
        })
        .eq('user_id', userId);
      
      if (updateError) throw updateError;
    } else {
      // Criar um novo registro de progresso
      const { error: insertError } = await supabase
        .from('user_progress_summary')
        .insert({
          user_id: userId,
          streak_days: 1,
          total_exercises: 1,
          last_activity_date: today.toISOString()
        });
      
      if (insertError) throw insertError;
    }
  } catch (error) {
    console.error("Erro ao atualizar progresso do usuário:", error);
    throw error;
  }
};
