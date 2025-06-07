import { useMutation, useQueryClient } from '@tanstack/react-query';
import mealService, { UpdateMealStatusPayload } from '../services/meal.service';
import { authKeys } from './useAuth';

// Query keys
export const mealKeys = {
  all: ['meal'] as const,
  status: () => [...mealKeys.all, 'status'] as const,
};

/**
 * Hook to update meal status
 */
export const useMealStatusUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      dietPlanId,
      payload,
    }: {
      dietPlanId: string;
      payload: UpdateMealStatusPayload;
    }) => mealService.updateMealStatus(dietPlanId, payload),
    onSuccess: () => {
      // Invalidate user data to refetch updated meal plans
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
    onError: (error) => {
      console.error('Failed to update meal status:', error);
    },
  });
};
