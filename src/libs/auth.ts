import { toast } from "react-toastify";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "./access-token";
import api, { ApiErrorResponse } from "./api";

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
    } catch (error: unknown) {
      return {
        success: false,
        message: (error as ApiErrorResponse).data.message,
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
      } catch (e: unknown) {
        const error = e as ApiErrorResponse;

        if (error.status == 401) {
          this.logout();
        }

        toast.error(error.data.message);
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
