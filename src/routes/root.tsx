import { Outlet } from "react-router-dom";
import { Footer } from "./footer";

export function RootRoute() {
  return (
    <div className="">
      <header>{/* Header content */}</header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
