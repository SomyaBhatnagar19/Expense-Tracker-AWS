/* /frontend/App.js */

import React from "react";
import SignUp from "./Views/SignUp";
import ExpensesForm from "./Views/ExpensesForm";

function App() {
  return (
    <div className="bg-cyan-100">
      <SignUp />
      <ExpensesForm />
    </div>
  )
}

export default App;
