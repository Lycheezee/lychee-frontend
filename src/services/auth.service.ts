import axios from "axios";
import { AuthUser, UserLoginReq, UserRegisterReq } from "../types/user";
import cookiesService from "./cookie.service";

const BASE_URL = `${process.env.EXPO_PUBLIC_API_URL}/auth`;

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

    if (accessToken) cookiesService.setCookie("accessToken", accessToken);
    if (rest) cookiesService.setCookie("userAuth", rest);
  }

  async login(payload: UserLoginReq) {
    const url = `${BASE_URL}/login`;
    const { data } = await axios.post<AuthUser>(url, payload);

    return data;
  }

  async register(payload: UserRegisterReq) {
    const url = `${BASE_URL}/register`;
    const { data } = await axios.post<AuthUser>(url, {
      payload,
    });

    return data;
  }

  async checkSetupPasswordToken(token: string) {
    const url = `${process.env.NEXT_PUBLIC_API_BASEURL}/auth/check-setup-token`;
    const { data } = await axios.post(url, { token });
    return data;
  }

  async logoutUser() {
    cookiesService.clearAuthCookies();
  }
}

export const authService = new AuthService();

export default authService;
