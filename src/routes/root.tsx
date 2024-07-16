import { Outlet } from "react-router-dom";

export function RootRoute() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-[1]">
        <Outlet />
      </main>

      <footer className="p-4 bg-amber-200">
        <p>COPYRIGHT</p>
      </footer>
    </div>
  );
}
