import { useQuery } from '@tanstack/react-query';
import { useUser } from './useAuth';
import { DietPlan } from '../types/meal';

import dietPlanService from '../services/dietPlan.service';

export const mealHistoryKeys = {
  all: ['mealHistory'] as const,
  list: () => [...mealHistoryKeys.all, 'list'] as const,
  byUserId: (userId: string) => [...mealHistoryKeys.all, userId] as const,
};

/**
 * Custom hook to fetch meal history from the backend diet plan endpoint
 * Returns the complete DietPlan object containing all meal data
 */
export const useMealHistory = () => {
  const { data, isLoading, error } = useUser();

  return useQuery<DietPlan | null>({
    queryKey: mealHistoryKeys.byUserId(data?.dietPlan?._id || ''),
    queryFn: async () => {
      try {
        const dietPlan = await dietPlanService.getDietPlan(data?.dietPlan?._id);
        return dietPlan;
      } catch (error) {
        console.error('Failed to fetch diet plan:', error);
        throw error;
      }
    },
    enabled: !!data?.dietPlan?._id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    meta: {
      userLoading: isLoading,
      userError: error,
    },
  });
};

export const mealHistoryWithDetailsKeys = {
  all: ['mealHistoryWithDetails'] as const,
  list: () => [...mealHistoryWithDetailsKeys.all, 'list'] as const,
  byUserId: (userId: string) => [...mealHistoryWithDetailsKeys.all, userId] as const,
};
