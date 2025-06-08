import { useState, useEffect, useMemo } from 'react';
import { useUser } from '~/hooks/useAuth';
import { useMealHistory } from '~/hooks/useMealHistory';
import { MealPlan } from '~/types/meal';
import { Nutrition } from '~/types/nutritions';
import { mockUser } from '~/mocks/dashboardMockData';
import { findTodayMealPlan } from '~/utils/mealPlanUtils';
import { calculateTotalNutrition } from '~/utils/nutritionCalculations';

/**
 * Custom hook for managing dashboard data
 * Handles user data fetching, meal plan retrieval from meal history service, and nutrition calculations
 */
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

  // Combine loading states for both user and diet plan
  const isLoading = isUserLoading || isDietLoading;

  // Combine errors - prioritize user error since it's more critical
  const error = userError || dietError;

  // Refetch function that refreshes both user and diet data
  const refetch = () => {
    refetchUser();
    refetchDiet();
  };

  /**
   * Find today's meal plan from the diet plan data
   * Uses useMemo for performance optimization
   */
  const todayPlan = useMemo<MealPlan | null>(() => {
    if (!dietPlan?.plan) {
      return null;
    }

    return findTodayMealPlan(dietPlan);
  }, [dietPlan]);

  /**
   * Handles meal status updates and recalculates nutrition
   * This function updates the local state and triggers nutrition recalculation
   */
  const handleMealStatusUpdate = (updatedPlan: MealPlan) => {
    // Note: The updated plan is handled by React Query's optimistic updates
    // This function primarily handles nutrition recalculation
    if (updatedPlan.meals && updatedPlan.meals.length > 0) {
      const totalNutrition = calculateTotalNutrition(updatedPlan.meals);
      setTodayNutritions(totalNutrition);
    }
  };

  // Calculate nutrition totals when today's plan changes
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
