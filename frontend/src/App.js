/* /frontend/App.js */

import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Views/SignUp";
import ExpensesForm from "./Views/ExpensesForm";
import Header from "./Views/Header";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div className="bg-cyan-100 min-h-screen">
        {isAuthenticated && <Header />}
        <Routes>
          {isAuthenticated && <Route path="/" element={<ExpensesForm />} />}
          <Route path="/" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;





