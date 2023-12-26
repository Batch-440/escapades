import {
  RouterProvider,
  createBrowserRouter,
  useRoutes,
} from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";
import Logout from "../components/Form/Logout";
import Home from "@/pages/Home/Home";
import Register from "@/pages/Register/Register";
import Trip from "@/pages/Trip";

const Routes = () => {
  const { auth } = useAuth();
  const token = auth.token;

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      element: <Home />,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/trip",
          element: <Trip />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const routes = useRoutes([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return routes;
};

export default Routes;
