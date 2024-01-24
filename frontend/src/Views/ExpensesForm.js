/* /frontend/Views/ExpensesForm.js*/

//file to have the functionality of expenses of users
import React, { useState } from "react";

export default function ExpensesForm() {

  //states for form input  
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  //function for form submission
  const handleAddExpense = (e) => {
    e.preventDefault();
  }

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Left Side (Form) */}
      <div className="lg:w-1/4 bg-gradient-to-l from-slate-50 to-slate-100 text-center p-4 border m-2 rounded shadow-xl">
        <form className="mt-4" onSubmit={handleAddExpense}>
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-600"
            >
              Category
            </label>
            <select
              id="category"
              className="mt-1 p-2 border rounded w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Travel">Travel</option>
              <option value="Snacks">Snacks/Junk food</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Education">Education</option>
              <option value="Stationary">Stationary</option>
              <option value="Fuel">Fuel</option>
              <option value="Servicing">Repairing/Servicing</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Salary">Salary</option>
              <option value="Bills">Bills/ EMI</option>
              <option value="Fashion">Fashion & Beauty</option>
            </select>
          </div>

          <div className="mb-4 flex flex-col">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              className="mt-1 p-2 border rounded w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-4 flex flex-row">
            <label
              htmlFor="amount"
              className="block text-md font-medium text-gray-600 bg-slate-800"
            >
              ₹
            </label>
            <input
              type="text"
              id="amount"
              className="mt-1 p-2 border rounded w-full"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button
            className="mt-1 text-white px-3 py-1 border rounded-xl bg-slate-800"
            type="submit"
          >
            Add Expense
          </button>
        </form>
      </div>

      {/* Right Side (User Entered Data) */}
      <div className="lg:w-1/2 p-4">
        <h2 className="text-2xl font-semibold mb-4">User Entered Data</h2>
        <ul>
          <li className="mb-2">
            <span className="font-semibold">Category:</span> {category}
          </li>
          <li className="mb-2">
            <span className="font-semibold">Description:</span> {description}
          </li>
          <li className="mb-2">
            <span className="font-semibold">Amount:</span> {amount}
          </li>
        </ul>
      </div>
    </div>
  );
}
