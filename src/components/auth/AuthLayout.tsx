import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
}

const AuthLayout = ({ children, isAuthenticated = false }: AuthLayoutProps) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthLayout;
