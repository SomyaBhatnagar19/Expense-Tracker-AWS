/* /frontend/App.js */

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./Views/SignUp";
import ExpensesForm from "./Views/ExpensesForm";

function App() {
  // State to track whether the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Set isAuthenticated to true if token exists
  }, []);

  return (
    <Router>
      <div className="bg-cyan-100 min-h-screen">
        <Routes>
          <Route
            path="/expenses"
            element={<ExpensesForm />}
            // Use the condition within the component
          />
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/expenses" /> : <SignUp />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


