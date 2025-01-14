import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
}

const AuthLayout = ({ children, isAuthenticated = false }: AuthLayoutProps) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-50"
    >
      {children}
    </motion.div>
  );
};

export default AuthLayout;
