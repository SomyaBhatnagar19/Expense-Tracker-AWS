/* /frontend/Views/SignUp.js */

import React, { useState } from "react";

export default function SignUp() {
  //state for showing signup form
  const [showSignUp, setShowSignUp] = useState(false);
  //state for login form
  const [showLogin, setLogin] = useState(true);

  //function to set the state for showing signup form
  const SignUpButtonClicked = () => {
    setShowSignUp(true);
    setLogin(false);
  };

  //function to set the state for showing login form
  const LoginButtonClicked = () => {
    setShowSignUp(false);
    setLogin(true);
  };

  //states for input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //function to handle signup and send data to the backend table users
  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:3000/SignUp", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
      });
      if (response.ok) {
        alert("User created successfully!");
        // Clearing form inputs after successful signup
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.log("Error: ", err);
      alert(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-2 w-full max-w-md">
        {/* Login */}
        {!showSignUp || showLogin ? (
          <div className="bg-gradient-to-l from-slate-50 to-slate-100 text-center p-4 border shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Login</h3>
            <h5>Use your credentials to login.</h5>
            <form className="mt-2 flex flex-col">
              <input
                type="email"
                placeholder="email"
                className="border border-gray-300 rounded px-3 py-2 mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                className="border border-gray-300 rounded px-3 py-2 mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p>Forgot your password?</p>
              <button
                className="mt-1 text-white px-3 py-1 border rounded-xl bg-slate-800"
                onClick={LoginButtonClicked}
              >
                LOGIN
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center bg-gradient-to-l from-cyan-600 to-cyan-700 text-white p-4 shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Welcome Back!</h3>
            <h5>Login with your details to stay connected.</h5>
            <button
              className="mt-2 text-white px-4 py-1 border rounded-xl"
              onClick={LoginButtonClicked}
            >
              Login
            </button>
          </div>
        )}

        {/* SignUp */}
        {!showSignUp || showLogin ? (
          <div className="text-center bg-gradient-to-l from-cyan-600 to-cyan-700 text-white p-4 shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Hello! New User?</h3>
            <h5>Enter your details and start your journey.</h5>
            <button
              className="mt-2 text-white px-4 py-1 border rounded-xl"
              onClick={SignUpButtonClicked}
            >
              SignUp
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-l from-slate-50 to-slate-100 text-center p-4 border shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Create Account</h3>
            <h5>Fill in your credentials.</h5>
            <div className="mt-2 flex flex-col">
              <input
                className="border border-gray-300 rounded px-3 py-2 mt-2"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded px-3 py-2 mt-2"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded px-3 py-2 mt-2"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="mt-2 bg-cyan-900 hover:bg-cyan-700 focus:bg-cyan-700 text-white px-4 py-1 border rounded-xl"
                onClick={handleSignUp}
              >
                SignUp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
