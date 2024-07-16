import { Outlet } from "react-router-dom";
import { Footer } from "./footer";

export function RootRoute() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>{/* Your header content */}</header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
