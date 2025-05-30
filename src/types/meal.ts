import { Nutrition } from './nutritions';

export enum EMealStatus {
  COMPLETED = 'completed',
  NOT_COMPLETED = 'not_completed',
}

export interface Meal {
  id: string;
  name: string;
  status: EMealStatus;
  nutrition?: Nutrition;
}

export interface MealPlan {
  date: string;
  meals: Meal[];
  percentageOfCompletions: number;
  nutritionSummary: Nutrition;
}
