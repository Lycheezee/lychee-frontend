import { MealPlan, EMealStatus } from '../types/meal';

export const mockDailyProgress: MealPlan = {
  date: new Date().toISOString().split('T')[0],
  meals: [
    {
      _id: '1',
      name: 'Meal 1',
      status: EMealStatus.COMPLETED,
    },
    {
      _id: '2',
      name: 'Meal 2',
      status: EMealStatus.COMPLETED,
    },
    {
      _id: '3',
      name: 'Meal 3',
      status: EMealStatus.NOT_COMPLETED,
    },
    {
      _id: '4',
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
  mealPlanDays: 7,
  dietPlan: {
    _id: 'mock-diet-plan-id',
    nutritionsPerDay: {
      calories: 2000,
      carbohydrates: 20,
      proteins: 200,
      fats: 20,
      sugars: 5,
      fibers: 15,
      sodium: 500,
      cholesterol: 20,
      waterIntake: 2000,
    },
    plan: [mockDailyProgress], // Include today's plan
  },
};
