import { getAccessToken } from "./access-token";
import { authProvider } from "./auth";

export async function authGuard(redirectTo?: string) {
  if (getAccessToken() && !authProvider.isAuthenticated) {
    await authProvider.fetchUser();
  }

  if (!authProvider.isAuthenticated) {
    return redirectTo ? `/login?redirect=${redirectTo}` : "/login";
  }

  return null;
}
