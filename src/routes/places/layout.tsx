import { TopBarProgress } from "@/components/top-bar-progress";
import { Outlet } from "react-router-dom";

export function PlacesLayoutRoute() {
  return (
    <>
      <TopBarProgress />
      <Outlet />
    </>
  );
}
