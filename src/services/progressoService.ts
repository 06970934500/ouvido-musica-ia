
// Este arquivo agora serve como um índice para os serviços específicos
import { saveExerciseProgress } from './exercise/exerciseProgressService';
import { getWeeklyProgress } from './analytics/weeklyProgressService';
import { getProgressByCategory } from './analytics/categoryProgressService';
import { getUserStats } from './user/userStatsService';

export {
  saveExerciseProgress,
  getWeeklyProgress,
  getProgressByCategory,
  getUserStats
};
