import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { RootRoute } from "./routes/root";
import { PlacesIndexRoute, loader as placesIndexLoader } from "./routes/places";
import { HomeRoute, loader as homeLoader } from "./routes/home";
import { AboutRoute, loader as aboutLoader } from "./routes/about";

import { PlacesLayoutRoute } from "./routes/places/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    children: [
      {
        path: "/",
        element: <HomeRoute />,
        loader: homeLoader,
      },
      {
        path: "/about",
         element: <AboutRoute />,
         loader: aboutLoader,
      },
      {
        path: "/track-history",
        // element: <TrackHistory />,
      },
      {
        path: "/social-sharing",
        // element: <SocialSharing />,
      },
    ],
  },
  {
    path: "/places",
    element: <PlacesLayoutRoute />,
    children: [
      {
        path: "/places",
        element: <PlacesIndexRoute />,
        loader: placesIndexLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
