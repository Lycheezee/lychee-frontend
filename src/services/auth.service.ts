import { AuthUser, UserLoginReq, UserRegisterReq } from '../types/user';
import cookiesService from './cookie.service';
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

  getUser() {
    const user = cookiesService.getItem('userAuth');
    return user;
  }

  async login(payload: UserLoginReq) {
    const url = `${BASE_URL}/login`;
    const { data } = await axios.post<AuthUser>(url, payload);
    this.storeAuthInCookie(data);
    return data;
  }

  async register(payload: UserRegisterReq) {
    const url = `${BASE_URL}/register`;
    const { data } = await axios.post<AuthUser>(url, {
      payload,
    });
    return data;
  }

  async logoutUser() {
    cookiesService.clearAuth();
  }
}

const authService = new AuthService();
export default authService;
