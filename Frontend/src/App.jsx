import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/checkoutPage";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Check auth on app load
  useEffect(() => {
    const authData = localStorage.getItem("auth");

    if (authData) {
      try {
        const parsedAuth = JSON.parse(authData);

        if (
          parsedAuth.accessToken &&
          parsedAuth.expiry &&
          Date.now() < parsedAuth.expiry
        ) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("auth");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error parsing auth data:", error);
        localStorage.removeItem("auth");
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={isDarkMode ? "dark" : "light"}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            }
          />

          <Route
            path="/home"
            element={
              <HomePage isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            }
          />

          <Route
            path="/book"
            element={
              <CheckoutPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}
