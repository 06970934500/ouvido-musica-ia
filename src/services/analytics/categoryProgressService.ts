
import { supabase } from "@/integrations/supabase/client";
import { ExerciseAnalytics } from "@/types/progresso";

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
      Object.keys(typeToIndex).forEach(type => {
        totalByType[type] = {
          'iniciante': { correct: 0, total: 0 },
          'intermediario': { correct: 0, total: 0 },
          'avancado': { correct: 0, total: 0 }
        };
      });
      
      // Somar os resultados
      data.forEach((entry: any) => {
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
            
            if (difficulty === 'iniciante') {
              result[categoryIndex].iniciante = percentage;
            } else if (difficulty === 'intermediario') {
              result[categoryIndex].intermediario = percentage;
            } else if (difficulty === 'avancado') {
              result[categoryIndex].avancado = percentage;
            }
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
