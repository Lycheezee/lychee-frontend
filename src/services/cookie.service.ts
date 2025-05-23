import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthUser } from '../types/user';

export type Token<T = number> = {
  token: string;
  expiresAt: T;
};

export interface CookieKey {
  userAuth: Omit<AuthUser, 'accessToken'>;
  accessToken: Token;
}

export type AuthCookieKey = keyof CookieKey;

class StorageService {
  async setItem<K extends keyof CookieKey>(key: K, data: CookieKey[K]) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Failed to save ${key} to storage`, error);
    }
  }

  async getItem<K extends keyof CookieKey>(key: K): Promise<CookieKey[K] | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (!value) return null;
      const auth = JSON.parse(value) as CookieKey[K];
      return auth;
    } catch (error) {
      console.error(`Failed to read ${key} from storage`, error);
      return null;
    }
  }

  async removeItem(key: keyof CookieKey) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove ${key} from storage`, error);
    }
  }

  async clearAuth() {
    await this.removeItem('accessToken');
    await this.removeItem('userAuth');
  }
}

export default new StorageService();
