
import { supabase } from "@/integrations/supabase/client";
import { WeeklyProgress } from "@/types/progresso";

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
      data.forEach((entry: any) => {
        const date = new Date(entry.completed_at);
        const dayIndex = date.getDay();
        const dayResult = result.find((r, idx) => idx === dayIndex);
        
        if (dayResult) {
          dayResult.acertos += entry.correct_answers;
          dayResult.exercicios += entry.total_questions;
        }
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
