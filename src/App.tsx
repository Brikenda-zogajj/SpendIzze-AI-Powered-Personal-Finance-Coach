import { Suspense, useState } from "react";
import { useRoutes, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/home";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import AuthLayout from "./components/auth/AuthLayout";
import { Toaster } from "@/components/ui/toaster";
import routes from "tempo-routes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    // Mock authentication
    if (email === "demo@example.com" && password === "password") {
      setIsAuthenticated(true);
      navigate("/dashboard");
    }
  };

  const handleSignup = (email: string, password: string) => {
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<SignupForm onSignup={handleSignup} />}
          />
          <Route
            path="/dashboard/*"
            element={
              <AuthLayout isAuthenticated={isAuthenticated}>
                <Home />
              </AuthLayout>
            }
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <Toaster />
      </>
    </Suspense>
  );
}

export default App;
