import request from './baseRequest';
import { EMealStatus } from '../types/meal';

export interface UpdateMealStatusPayload {
  date: string; // Date in YYYY-MM-DD format
  foodId: string;
  status: EMealStatus;
}

export class MealService {
  async updateMealStatus(dietPlanId: string, payload: UpdateMealStatusPayload) {
    try {
      const response = await request.patch(`/diet-plan/${dietPlanId}/meal-status`, payload);
      return response.data;
    } catch (error) {
      console.error('Error updating meal status:', error);
      throw error;
    }
  }

  async getMealHistory(userId: string, daysLimit?: number) {
    try {
      const response = await request.get(`/diet-plan/${userId}/history`, {
        params: { limit: daysLimit || 30 },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching meal history:', error);
      throw error;
    }
  }
}

const mealService = new MealService();
export default mealService;
