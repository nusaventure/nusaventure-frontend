import { TopBarProgress } from "@/components/top-bar-progress";
import { getAccessToken } from "@/libs/access-token";
import { authProvider } from "@/libs/auth";
import { Outlet } from "react-router-dom";

export async function loader() {
  if (getAccessToken()) {
    await authProvider.fetchUser();
  }

  return authProvider.user;
}

export function PlacesLayoutRoute() {
  return (
    <>
      <TopBarProgress />
      <Outlet />
    </>
  );
}
