import moment from 'moment';
import { EMealStatus, MealPlan } from '~/types/meal';

/**
 * Finds today's meal plan from a diet plan
 * @param dietPlan - The user's diet plan containing an array of meal plans
 * @returns The meal plan for today or null if not found
 */
export const findTodayMealPlan = (dietPlan: any): MealPlan | null => {
  if (!dietPlan || !dietPlan.plan || !Array.isArray(dietPlan.plan)) {
    return null;
  }

  const today = moment().format('YYYY-MM-DD');

  return (
    dietPlan.plan.find((plan: MealPlan) => {
      const planDate = moment(plan.date).format('YYYY-MM-DD');
      return planDate === today;
    }) || null
  );
};

/**
 * Checks if a meal plan is for today's date
 * @param mealPlan - The meal plan to check
 * @returns True if the meal plan is for today
 */
export const isTodayMealPlan = (mealPlan: MealPlan): boolean => {
  const today = moment().format('YYYY-MM-DD');
  const planDate = moment(mealPlan.date).format('YYYY-MM-DD');
  return planDate === today;
};

/**
 * Gets the completion percentage for a meal plan
 * @param mealPlan - The meal plan to calculate completion for
 * @returns The completion percentage (0-100)
 */
export const getMealPlanCompletionPercentage = (mealPlan: MealPlan): number => {
  if (!mealPlan.meals || mealPlan.meals.length === 0) {
    return 0;
  }

  const completedMeals = mealPlan.meals.filter(
    (meal) => meal.status === EMealStatus.COMPLETED
  ).length;

  return Math.round((completedMeals / mealPlan.meals.length) * 100);
};
