import { useState, useEffect, useMemo } from 'react';
import { useUser } from '~/hooks/useAuth';
import { useMealHistory } from '~/hooks/useMealHistory';
import { MealPlan } from '~/types/meal';
import { Nutrition } from '~/types/nutritions';
import { mockUser } from '~/mocks/dashboardMockData';
import { findTodayMealPlan } from '~/utils/mealPlanUtils';
import { calculateTotalNutrition } from '~/utils/nutritionCalculations';

export const useDashboardData = () => {
  const {
    data: userInfo,
    isLoading: isUserLoading,
    error: userError,
    refetch: refetchUser,
  } = useUser();
  const {
    data: dietPlan,
    isLoading: isDietLoading,
    error: dietError,
    refetch: refetchDiet,
  } = useMealHistory();

  const [todayNutritions, setTodayNutritions] = useState<Nutrition | null>(null);

  const isLoading = isUserLoading || isDietLoading;
  const error = userError || dietError;

  const refetch = () => {
    refetchUser();
    refetchDiet();
  };

  const todayPlan = useMemo<MealPlan | null>(() => {
    if (!dietPlan?.plan) return null;
    return findTodayMealPlan(dietPlan);
  }, [dietPlan]);

  const handleMealStatusUpdate = (updatedPlan: MealPlan) => {
    if (updatedPlan.meals && updatedPlan.meals.length > 0) {
      const totalNutrition = calculateTotalNutrition(updatedPlan.meals);
      setTodayNutritions(totalNutrition);
    }
  };

  useEffect(() => {
    if (todayPlan?.meals && todayPlan.meals.length > 0) {
      const totalNutrition = calculateTotalNutrition(todayPlan.meals);
      setTodayNutritions(totalNutrition);
    } else {
      setTodayNutritions(null);
    }
  }, [todayPlan]);

  return {
    userInfo: userInfo || mockUser,
    todayPlan,
    todayNutritions,
    isLoading,
    error: error?.message || null,
    handleMealStatusUpdate,
    refetch,
  };
};
