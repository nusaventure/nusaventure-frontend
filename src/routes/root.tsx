import { Outlet } from "react-router-dom";
import { Footer } from "./footer";
import { authProvider } from "@/libs/auth";
import { getAccessToken } from "@/libs/access-token";
import { TopBarProgress } from "@/components/top-bar-progress";

export async function loader() {
  if (getAccessToken()) {
    await authProvider.fetchUser();
  }

  return authProvider.user;
}

export function RootRoute() {
  return (
    <div className="">
      <TopBarProgress />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
