import request from './baseRequest';
import { IUser } from '../types/user';

const BASE_URL = `${process.env.EXPO_PUBLIC_API_URL}/user`;

export interface UserUpdatePayload {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  gender?: string;
  dob?: string;
  bodyInfo?: { weight?: number; height?: number; exerciseRate?: string; macro_preference?: string };
  mealPlanDays?: number;
}

export interface UserUpdateParams {
  type: 'userInfo' | 'bodyInfo' | 'mealLength';
}

export class UserService {
  async updateUser(payload: UserUpdatePayload, params?: UserUpdateParams): Promise<IUser> {
    const url = `${BASE_URL}/update`;
    const { data } = await request.put(url, { ...payload, dateOfBirth: payload.dob }, { params });
    return data;
  }
}

const userService = new UserService();
export default userService;
