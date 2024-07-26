import { toast } from "react-toastify";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "./access-token";
import api from "./api";

type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
};

type AuthProvider = {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  login(
    username: string,
    password: string
  ): Promise<{
    success: boolean;
    message: string;
  }>;
  fetchUser(): Promise<void>;
  logout(): void;
};

export const authProvider: AuthProvider = {
  isAuthenticated: false,
  token: null,
  user: null,
  async login(username, password) {
    try {
      const { data } = await api<{
        data: {
          token: string;
        };
      }>("/auth/login", {
        method: "POST",
        body: {
          username,
          password,
        },
      });

      setAccessToken(data.token);
      authProvider.token = data.token;

      return {
        success: true,
        message: "Success",
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  async fetchUser() {
    const token = getAccessToken();
    if (token) {
      try {
        const { data } = await api<{ data: User }>("/auth/me");

        authProvider.isAuthenticated = true;
        authProvider.user = data;
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  },
  logout() {
    removeAccessToken();
    authProvider.isAuthenticated = false;
    authProvider.token = null;
    authProvider.user = null;
  },
};
