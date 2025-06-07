import { useState, useEffect } from 'react';
import authService from '~/services/auth.service';
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
  const [userInfo, setUserInfo] = useState(mockUser);
  const [todayPlan, setTodayPlan] = useState<MealPlan | null>(null);
  const [todayNutritions, setTodayNutritions] = useState<Nutrition | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  /**
   * Fetches user data and sets up today's meal plan
   */
  const fetchUserData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const userData = await authService.getUser();
      if (userData) {
        setUserInfo(userData);

        // Find today's meal plan
        const userTodayPlan = findTodayMealPlan(userData.dietPlan);

        if (userTodayPlan) {
          setTodayPlan(userTodayPlan);

          // Calculate nutrition totals for today's meals
          if (userTodayPlan.meals && userTodayPlan.meals.length > 0) {
            const totalNutrition = calculateTotalNutrition(userTodayPlan.meals);
            setTodayNutritions(totalNutrition);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load user data');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    userInfo,
    todayPlan,
    todayNutritions,
    isLoading,
    error,
    handleMealStatusUpdate,
    refetch: fetchUserData,
  };
};
