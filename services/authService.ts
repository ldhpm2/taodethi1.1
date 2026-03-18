import { User, UserStatus } from '../types';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxAlL8MfjrcZN7FlS2jl5o8PrSebjfDoVB81EteYPFJ-Egqd-wjoHE6Dn5IG1VY5TSA/exec';

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    if (!APPS_SCRIPT_URL) {
      return { success: false, message: 'Apps Script URL chưa được cấu hình.' };
    }

    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          action: 'login',
          email,
          password
        })
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Lỗi kết nối đến máy chủ.' };
    }
  },

  async register(userData: Omit<User, 'registrationDate' | 'status'>): Promise<AuthResponse> {
    if (!APPS_SCRIPT_URL) {
      return { success: false, message: 'Apps Script URL chưa được cấu hình.' };
    }

    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          action: 'register',
          ...userData,
          registrationDate: new Date().toISOString(),
          status: 'Chờ Duyệt'
        })
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, message: 'Lỗi kết nối đến máy chủ.' };
    }
  }
};
