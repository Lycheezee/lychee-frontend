import request from './baseRequest';
import { DietPlan } from '../types/meal';

const BASE_URL = `${process.env.EXPO_PUBLIC_API_URL}/dietplan`;

export class DietPlanService {
  /**
   * Get diet plan by planId
   * @param planId - The planId to fetch the diet plan for
   * @returns Promise<DietPlan> - The user's diet plan
   */
  async getDietPlan(planId: string): Promise<DietPlan> {
    const url = `${BASE_URL}/${planId}`;
    const { data } = await request.get(url);
    return data;
  }
}

const dietPlanService = new DietPlanService();
export default dietPlanService;
