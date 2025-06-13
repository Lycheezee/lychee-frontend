import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import dietPlanService from '../services/dietPlan.service';
import { DietPlan } from '../types/meal';

interface RegenerateDietPlanParams {
  planId: string;
  aiModel: 'gemma' | 'gemini' | 'lychee';
}

export const useRegenerateDietPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ planId, aiModel }: RegenerateDietPlanParams) =>
      dietPlanService.regenerateDietPlanWithAI(planId, aiModel),
    onSuccess: (data: DietPlan) => {
      // Invalidate and refetch diet plan queries
      queryClient.invalidateQueries({ queryKey: ['dietPlan'] });
      queryClient.invalidateQueries({ queryKey: ['meal'] });
      queryClient.invalidateQueries({ queryKey: ['mealHistory'] });
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });

      Alert.alert(
        'Success!',
        'Your diet plan has been regenerated successfully. You can now see your updated meal plan.',
        [{ text: 'OK' }]
      );
    },
    onError: (error: any) => {
      console.error('Error regenerating diet plan:', error);
      Alert.alert('Error', 'Failed to regenerate your diet plan. Please try again later.', [
        { text: 'OK' },
      ]);
    },
  });
};
