type ApiOptions = Omit<RequestInit, "body"> & {
  body?: Record<string, unknown> | BodyInit;
};

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL as string;

async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

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
      throw await response.json();
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export default api;
