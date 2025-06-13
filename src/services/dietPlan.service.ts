import request from './baseRequest';
import { DietPlan } from '../types/meal';

const BASE_URL = `${process.env.EXPO_PUBLIC_API_URL}/diet-plan`;

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
  /**
   * Regenerate diet plan using AI model
   * @param planId - The planId to regenerate
   * @param aiModel - The AI model to use ('gemma', 'gemini', or 'lychee')
   * @returns Promise<DietPlan> - The regenerated diet plan
   */
  async regenerateDietPlanWithAI(
    planId: string,
    aiModel: 'gemma' | 'gemini' | 'lychee'
  ): Promise<DietPlan> {
    const url = `${BASE_URL}/regen-with-ai/${planId}`;
    const { data } = await request.post(url, { model: aiModel });
    return data;
  }
}

const dietPlanService = new DietPlanService();
export default dietPlanService;
