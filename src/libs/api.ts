/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAccessToken } from "./access-token";

/* eslint-disable no-useless-catch */
type ApiOptions = Omit<RequestInit, "body"> & {
  body?: Record<string, unknown> | BodyInit;
};

export type ApiErrorResponse = {
  status: number;
  data: any;
};

export const BASE_URL = import.meta.env.VITE_BACKEND_API_URL as string;

async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

  const token = getAccessToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const fetchOptions: RequestInit = {
    method: options.method,
    headers,
    mode: options.mode,
    cache: options.cache,
    credentials: options.credentials,
    redirect: options.redirect,
    referrerPolicy: options.referrerPolicy,
  };

  // Handle body
  if (options.body) {
    if (
      typeof options.body === "object" &&
      !(options.body instanceof Blob) &&
      !(options.body instanceof FormData) &&
      !(options.body instanceof URLSearchParams)
    ) {
      fetchOptions.body = JSON.stringify(options.body);
    } else {
      fetchOptions.body = options.body as BodyInit;
    }
  }

  // Ensure the path is correctly appended to the base URL
  const finalUrl = `${BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  try {
    const response = await fetch(finalUrl, fetchOptions);

    if (!response.ok) {
      throw {
        status: response.status,
        data: await response.json(),
      } as ApiErrorResponse;
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    throw error as ApiErrorResponse;
  }
}

export default api;
