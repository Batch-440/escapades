import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export const ProtectedRoute = () => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const token = auth.token;
  const decodedToken = token && jwtDecode(token);

  // Check if the token is expired, it clears auth state thus logout user
  useEffect(() => {
    if (!decodedToken || !decodedToken.exp) return;
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.clear();
      setAuth({
        user: null,
        token: null,
      });
    }
  }, [setAuth, decodedToken, location]);

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
