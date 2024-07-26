import { Outlet } from "react-router-dom";
import { Footer } from "./footer";

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
