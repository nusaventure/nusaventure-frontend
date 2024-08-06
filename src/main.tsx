import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RootRoute, loader as rootLoader } from "./routes/root";
import { PlacesIndexRoute, loader as placesIndexLoader } from "./routes/places";
import {
  HomeRoute,
  loader as homeLoader,
  action as homeAction,
} from "./routes/home";
import { AboutRoute, loader as aboutLoader } from "./routes/about";

import { PlacesLayoutRoute } from "./routes/places/layout";
import { LoginRoute, action as loginAction } from "./routes/login";
import { RegisterRoute, action as registerAction } from "./routes/register";
import { MapsRoute, loader as mapsLoader } from "./routes/maps";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <RootRoute />,
    loader: rootLoader,
    children: [
      {
        path: "/",
        element: <HomeRoute />,
        loader: homeLoader,
        action: homeAction,
      },
      {
        path: "/about",
        element: <AboutRoute />,
        loader: aboutLoader,
      },
      {
        path: "/maps",
        element: <MapsRoute />,
        loader: mapsLoader,
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
  {
    path: "/login",
    element: <LoginRoute />,
    action: loginAction,
  },
  {
    path: "/register",
    element: <RegisterRoute />,
    action: registerAction,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      theme="light"
      transition={Slide}
    />
  </>
);
