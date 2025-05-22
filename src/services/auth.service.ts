import { AuthUser, UserLoginReq, UserRegisterReq } from '../types/user';
import cookiesService from './cookie.service';
import request from './baseRequest';
import axios from 'axios';

const BASE_URL = `${process.env.EXPO_PUBLIC_API_URL}/user`;

export interface LoginError {
  response: {
    status: number;
    data: {
      message: string;
    };
  };
}

export class AuthService {
  storeAuthInCookie(user: AuthUser) {
    const { accessToken, ...rest } = user;

    if (accessToken) cookiesService.setItem('accessToken', accessToken);
    if (rest) cookiesService.setItem('userAuth', rest);
  }

  async login(payload: UserLoginReq) {
    const url = `${BASE_URL}/login`;
    const { data } = await axios.post<AuthUser>(url, payload);
    return data;
  }

  async register(payload: UserRegisterReq) {
    const url = `${BASE_URL}/register`;
    console.log({ url, payload });
    const { data } = await axios.post<AuthUser>(url, {
      payload,
    });

    return data;
  }

  async checkSetupPasswordToken(token: string) {
    const url = `${process.env.NEXT_PUBLIC_API_BASEURL}/auth/check-setup-token`;
    const { data } = await request.post(url, { token });
    return data;
  }

  async logoutUser() {
    cookiesService.clearAuth();
  }
}

const authService = new AuthService();
export default authService;
