import { Outlet, useNavigation } from "react-router-dom";
import { Footer } from "./footer";
import { authProvider } from "@/libs/auth";
import { getAccessToken } from "@/libs/access-token";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
  barColors: {
    "0": "#f6c973",
    "1.0": "#f6c973",
  },
  barThickness: 5,
  shadowBlur: 2,
});

export async function loader() {
  if (getAccessToken()) {
    await authProvider.fetchUser();
  }

  return authProvider.user;
}

export function RootRoute() {
  const navigation = useNavigation();

  return (
    <div className="">
      <main className="flex-grow">
        {navigation.state == "loading" ? <TopBarProgress /> : <Outlet />}
      </main>

      <Footer />
    </div>
  );
}
