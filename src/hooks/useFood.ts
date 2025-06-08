import { useQuery } from '@tanstack/react-query';
import foodService, { IFood } from '../services/food.service';

// Query keys
export const foodKeys = {
  all: ['food'] as const,
  list: () => [...foodKeys.all, 'list'] as const,
};

/**
 * Hook to fetch all food items
 */
export const useAllFood = () => {
  return useQuery<IFood[], Error>({
    queryKey: foodKeys.list(),
    queryFn: () => foodService.getAllFood(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
