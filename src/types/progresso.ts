
export interface ExerciseProgress {
  id?: string;
  user_id: string;
  exercise_type: 'intervalos' | 'acordes' | 'progressoes' | 'melodias';
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
  correct_answers: number;
  total_questions: number;
  completed_at: Date;
  created_at?: Date;
}

export interface UserProgress {
  user_id: string;
  streak_days: number;
  total_exercises: number;
  last_activity_date: Date;
}

export type ExerciseAnalytics = {
  categoria: string;
  iniciante: number;
  intermediario: number;
  avancado: number;
};

export type WeeklyProgress = {
  day: string;
  acertos: number;
  exercicios: number;
};
