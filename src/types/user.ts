import { ExerciseRate } from "../constants/user.constants";
import { Token } from "../services/cookie.service";

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
  dietPlan: string;
}

export interface AuthUser {
  _id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
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
