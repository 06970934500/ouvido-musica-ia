
import { supabase } from "@/lib/supabase";
import { ExerciseProgress, UserProgress, ExerciseAnalytics, WeeklyProgress } from "@/types/progresso";

// Salvar o progresso de um exercício
export const saveExerciseProgress = async (progress: Omit<ExerciseProgress, 'id' | 'created_at'>) => {
  try {
    const { data, error } = await supabase
      .from('exercise_progress')
      .insert(progress)
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
      .from('user_progress')
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
        .from('user_progress')
        .update({
          streak_days: streakDays,
          total_exercises: existingProgress.total_exercises + 1,
          last_activity_date: today
        })
        .eq('user_id', userId);
      
      if (updateError) throw updateError;
    } else {
      // Criar um novo registro de progresso
      const { error: insertError } = await supabase
        .from('user_progress')
        .insert({
          user_id: userId,
          streak_days: 1,
          total_exercises: 1,
          last_activity_date: today
        });
      
      if (insertError) throw insertError;
    }
  } catch (error) {
    console.error("Erro ao atualizar progresso do usuário:", error);
    throw error;
  }
};

// Obter o progresso semanal do usuário
export const getWeeklyProgress = async (userId: string): Promise<WeeklyProgress[]> => {
  try {
    // Obter a data de 7 dias atrás
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);
    
    const { data, error } = await supabase
      .from('exercise_progress')
      .select('*')
      .eq('user_id', userId)
      .gte('completed_at', sevenDaysAgo.toISOString())
      .order('completed_at', { ascending: true });
    
    if (error) throw error;
    
    // Inicializar o array de resultados com os últimos 7 dias
    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const result: WeeklyProgress[] = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dayIndex = date.getDay();
      
      result.push({
        day: weekDays[dayIndex],
        acertos: 0,
        exercicios: 0
      });
    }
    
    // Agrupar os dados por dia
    if (data) {
      data.forEach(entry => {
        const date = new Date(entry.completed_at);
        const dayIndex = date.getDay();
        
        result[dayIndex].acertos += entry.correct_answers;
        result[dayIndex].exercicios += entry.total_questions;
      });
    }
    
    // Calcular as porcentagens
    return result.map(day => ({
      ...day,
      acertos: day.exercicios > 0 ? Math.round((day.acertos / day.exercicios) * 100) : 0
    }));
  } catch (error) {
    console.error("Erro ao obter progresso semanal:", error);
    throw error;
  }
};

// Obter o progresso por categoria
export const getProgressByCategory = async (userId: string): Promise<ExerciseAnalytics[]> => {
  try {
    const { data, error } = await supabase
      .from('exercise_progress')
      .select('*')
      .eq('user_id', userId);
    
    if (error) throw error;
    
    // Definir as categorias
    const categories = ['Intervalos', 'Acordes', 'Progressões', 'Melodias'];
    const result: ExerciseAnalytics[] = categories.map(categoria => ({
      categoria,
      iniciante: 0,
      intermediario: 0,
      avancado: 0
    }));
    
    // Mapear os tipos de exercícios para índices de categoria
    const typeToIndex: Record<string, number> = {
      'intervalos': 0,
      'acordes': 1,
      'progressoes': 2,
      'melodias': 3
    };
    
    // Agrupar os dados por categoria e dificuldade
    if (data) {
      const totalByType: Record<string, Record<string, { correct: number, total: number }>> = {};
      
      // Inicializar o objeto
      categories.forEach((_, index) => {
        const type = Object.keys(typeToIndex).find(key => typeToIndex[key] === index);
        if (type) {
          totalByType[type] = {
            'iniciante': { correct: 0, total: 0 },
            'intermediario': { correct: 0, total: 0 },
            'avancado': { correct: 0, total: 0 }
          };
        }
      });
      
      // Somar os resultados
      data.forEach(entry => {
        if (totalByType[entry.exercise_type]) {
          totalByType[entry.exercise_type][entry.difficulty].correct += entry.correct_answers;
          totalByType[entry.exercise_type][entry.difficulty].total += entry.total_questions;
        }
      });
      
      // Calcular as porcentagens
      Object.keys(totalByType).forEach(type => {
        const categoryIndex = typeToIndex[type];
        if (categoryIndex !== undefined) {
          Object.keys(totalByType[type]).forEach(difficulty => {
            const { correct, total } = totalByType[type][difficulty];
            const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
            
            // @ts-ignore - dificuldade como chave do objeto
            result[categoryIndex][difficulty] = percentage;
          });
        }
      });
    }
    
    return result;
  } catch (error) {
    console.error("Erro ao obter progresso por categoria:", error);
    throw error;
  }
};

// Obter estatísticas gerais do usuário
export const getUserStats = async (userId: string) => {
  try {
    // Obter progresso geral do usuário
    const { data: userProgress, error: userError } = await supabase
      .from('user_progress')
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
      exercises.forEach(ex => {
        totalCorrect += ex.correct_answers;
        totalQuestions += ex.total_questions;
      });
    }
    
    // Obter músicas analisadas
    const { count: musicCount, error: musicError } = await supabase
      .from('analyzed_songs')
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
