import { ExerciseRate } from '../constants/user.constants';
import { Token } from '../services/cookie.service';
import { DietPlan } from './meal';

interface BodyInfo {
  weight: number;
  height: number;
  exerciseRate: ExerciseRate;
  bmi: number;
}

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  bodyInfo: BodyInfo;
  dietPlan: DietPlan;
  mealPlanDays: number;
}

export interface AuthUser extends IUser {
  _id: string;
  accessToken: Token;
}

export type UserLoginReq = {
  email: string;
  password: string;
};

export type UserRegisterReq = {
  email: string;
  password: string;
  confirmPassword: string;
};
