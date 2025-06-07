import { useState, useEffect } from 'react';
import { useUser } from '~/hooks/useAuth';
import { MealPlan } from '~/types/meal';
import { Nutrition } from '~/types/nutritions';
import { mockUser } from '~/mocks/dashboardMockData';
import { findTodayMealPlan } from '~/utils/mealPlanUtils';
import { calculateTotalNutrition } from '~/utils/nutritionCalculations';

/**
 * Custom hook for managing dashboard data
 * Handles user data fetching, meal plan retrieval, and nutrition calculations
 */
export const useDashboardData = () => {
  const { data: userInfo, isLoading, error: userError, refetch } = useUser();
  const [todayPlan, setTodayPlan] = useState<MealPlan | null>(null);
  const [todayNutritions, setTodayNutritions] = useState<Nutrition | null>(null);

  /**
   * Handles meal status updates and recalculates nutrition
   */
  const handleMealStatusUpdate = (updatedPlan: MealPlan) => {
    setTodayPlan(updatedPlan);

    // Recalculate nutrition totals with updated meal statuses
    if (updatedPlan.meals && updatedPlan.meals.length > 0) {
      const totalNutrition = calculateTotalNutrition(updatedPlan.meals);
      setTodayNutritions(totalNutrition);
    }
  };

  // Process user data when it changes
  useEffect(() => {
    if (userInfo) {
      // Find today's meal plan
      const userTodayPlan = findTodayMealPlan(userInfo.dietPlan);

      if (userTodayPlan) {
        setTodayPlan(userTodayPlan);

        // Calculate nutrition totals for today's meals
        if (userTodayPlan.meals && userTodayPlan.meals.length > 0) {
          const totalNutrition = calculateTotalNutrition(userTodayPlan.meals);
          setTodayNutritions(totalNutrition);
        }
      }
    } else {
      // Fallback to mock data if no user data available
      setTodayPlan(null);
      setTodayNutritions(null);
    }
  }, [userInfo]);

  return {
    userInfo: userInfo || mockUser,
    todayPlan,
    todayNutritions,
    isLoading,
    error: userError?.message || null,
    handleMealStatusUpdate,
    refetch,
  };
};
