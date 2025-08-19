import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { DarkModeProvider } from "./theme/DarkmodeContext";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [activeSection, setActiveSection] = useState("dashboard"); // default section

  // Keep token in sync with localStorage
  useEffect(() => {
    const handleStorage = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <DarkModeProvider>
      <Router>
        {/* Conditionally render Navbar */}
        <ConditionalNavbar token={token} setToken={setToken} />

        <div className="pt-16 flex">
          <div className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={token ? <Navigate to="/dashboard" /> : <Login setToken={setToken} />}
              />
              <Route
                path="/signup"
                element={token ? <Navigate to="/dashboard" /> : <Signup setToken={setToken} />}
              />
              <Route
                path="/dashboard"
                element={
                  token ? (
                    <Dashboard
                      activeSection={activeSection}
                      setActiveSection={setActiveSection}
                    />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

// Component to hide Navbar on dashboard
function ConditionalNavbar({ token, setToken }) {
  const location = useLocation();
  if (location.pathname === "/dashboard") return null; // hide Navbar on dashboard
  return <Navbar token={token} setToken={setToken} />;
}

export default App;
