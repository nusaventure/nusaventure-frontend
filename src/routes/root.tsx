import { Outlet, Link } from "react-router-dom";

export function RootRoute() {
  return (
    <div>
      <header>
        <h1>
          <Link to="/">🏝️NUSAVENTURE</Link>
        </h1>
      </header>

      <Outlet />

      <h1>
        <Link to="/map-example">Map</Link>
      </h1>

      <footer>
        <p>COPYRIGHT</p>
      </footer>
    </div>
  );
}
