import Cookies, { CookieAttributes } from "js-cookie";
import { AuthUser } from "../types/user";

export type Token<T = number> = {
  token: string;
  expiresAt: T;
};

export interface CookieKey {
  userAuth: Omit<AuthUser, "accessToken">;
  accessToken: Token;
}

export type AuthCookieKey = keyof CookieKey;

class CookiesService<T extends keyof CookieKey> {
  setCookie(cookieName: T, data: CookieKey[T], options?: CookieAttributes) {
    Cookies.set(cookieName, JSON.stringify(data), {
      expires: 36500,
      ...options,
    });
  }

  getFromCookie(cookieName: T): CookieKey[T] | null {
    if (typeof window === "undefined") return null;
    const cookieValue = Cookies?.get(cookieName) ?? "{}";
    const value: CookieKey[T] = JSON.parse(cookieValue);
    return Object.keys(value).length ? value : null;
  }

  removeCookie(cookieName: keyof CookieKey) {
    Cookies.remove(cookieName);
  }

  clearAuthCookies() {
    this.removeCookie("accessToken");
  }
}

export default new CookiesService();
