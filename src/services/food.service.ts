import request from './baseRequest';
import { Nutrition } from '../types/nutritions';

export interface IFood {
  _id: string;
  name: string;
  descriptions: string;
  nutrition: Nutrition;
}

export class FoodService {
  async getAllFood(): Promise<IFood[]> {
    try {
      const response = await request.get('/food');
      return response.data;
    } catch (error) {
      console.error('Error fetching all food:', error);
      throw error;
    }
  }
}

const foodService = new FoodService();
export default foodService;
