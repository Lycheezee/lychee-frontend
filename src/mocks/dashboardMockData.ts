import { MealPlan, EMealStatus } from '../types/meal';

export const mockDailyProgress: MealPlan = {
  date: new Date().toISOString().split('T')[0],
  meals: [
    {
      id: '1',
      name: 'Meal 1',
      status: EMealStatus.COMPLETED,
    },
    {
      id: '2',
      name: 'Meal 2',
      status: EMealStatus.COMPLETED,
    },
    {
      id: '3',
      name: 'Meal 3',
      status: EMealStatus.NOT_COMPLETED,
    },
    {
      id: '4',
      name: 'Meal 4',
      status: EMealStatus.NOT_COMPLETED,
    },
  ],
  percentageOfCompletions: 50, // 2 out of 4 meals completed
  nutritionSummary: {
    calories: 2000,
    carbohydrates: 20,
    fats: 20,
    sugars: 5,
    proteins: 200,
    cholesterol: 20,
    fibers: 15,
    sodium: 500,
    waterIntake: 2000,
  },
};

// Mock user data
export const mockUser = {
  firstName: 'User',
  lastName: 'Name',
  mealPreferences: {
    mealPlanDays: 7, // Default one-week meal plan
  },
};
