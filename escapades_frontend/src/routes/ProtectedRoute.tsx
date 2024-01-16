import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export const ProtectedRoute = () => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  // Check if the token is expired, it clears auth state thus logout user
  useEffect(() => {
    const token = auth.token;
    const decodedToken = token && jwtDecode(token);
    if (
      decodedToken &&
      decodedToken.exp &&
      decodedToken.exp * 1000 < Date.now()
    ) {
      localStorage.clear();
      setAuth({
        user: null,
        token: null,
      });
    }
  }, [setAuth, auth, location]);

  // Check if the user is authenticated
  if (!auth.token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
