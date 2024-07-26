import { Outlet } from "react-router-dom";
import { Footer } from "./footer";
import { authProvider } from "@/libs/auth";

export async function loader() {
  if (!authProvider.isAuthenticated) {
    await authProvider.fetchUser();
  }

  return authProvider.user;
}

export function RootRoute() {
  return (
    <div className="">
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
