/* /frontend/Views/ExpensesForm.js*/

//file to have the functionality of expenses of users
import React, { useState, useEffect } from "react";

import deleteBtn from "../assets/deleteBtn.png";
import editBtn from "../assets/editBtn.png";

export default function ExpensesForm() {

  //states for form input  
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch expenses data when the component mounts
    fetchExpenses();
  }, []);

  //FETCHING THE DATA OF EXPENSES FROM EXPENSES TABLE
  const fetchExpenses = async () => {
    try {
      const response = await fetch("http://localhost:3000/expenses", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
      } else {
        console.error("Failed to fetch expenses");
      }
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  //ADD EXPENSES TO THE TABLE FROM CLIENT SIDE TO SERVER SIDE
  const handleAddExpense = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch("http://localhost:3000/expenses", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category,
          date,
          description,
          amount,
        }),
      });
  
      if (response.ok) {
        // Update the expenses data after successfully adding a new expense
        fetchExpenses();
  
        // Clear form inputs
        setCategory("");
        setDate("");
        setDescription("");
        setAmount("");
      } else {
        console.error("Failed to add expense");
      }
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };
  
  //DELETE FUNCTIONALITY BY SENDING ID
  const handleDeleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:3000/expenses/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Update the expenses data after successfully deleting an expense
        fetchExpenses();
        alert('Expense Deleted Successfully');
      } else {
        console.error("Failed to delete expense");
        alert('Error deleting expense.');
      }
    } catch (err) {
      console.error("Error deleting expense:", err);
      alert('Error deleting expense.');
    }
  };



  return (
    <div className="flex flex-col lg:flex-row pb-16">
      {/* Left Side (Form) */}
      <div className="lg:w-1/5 bg-gradient-to-l from-slate-50 to-slate-300 text-center p-4 border border-slate-900 m-2 rounded shadow-xl">
        <form onSubmit={handleAddExpense}>
          <div className="mb-4 flex items-center">
            <label
              htmlFor="Category"
              className="block text-md font-medium text-slate-100 bg-slate-800 p-2"
            >
              Category
            </label>
            <select
              id="category"
              className="mt-1 p-2 border rounded w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Select Category">Select Category</option>
              <option value="Travel">Travel</option>
              <option value="Snacks/Junk food">Snacks/Junk food</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Education">Education</option>
              <option value="Stationary">Stationary</option>
              <option value="Fuel">Fuel</option>
              <option value="Repairing/Servicing">Repairing/Servicing</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Salary">Salary</option>
              <option value="Bills/ EMI">Bills/ EMI</option>
              <option value="Fashion & Beauty">Fashion & Beauty</option>
            </select>
          </div>

          <div className="mb-4 flex items-center">
            <label
              htmlFor="date"
              className="block text-md font-medium text-slate-100 bg-slate-800 p-2"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              className="mt-1 p-2 border rounded w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="mb-4 flex items-center">
            <label
              htmlFor="description"
              className="block text-md font-medium text-slate-100 bg-slate-800 p-2"
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

          <div className="mb-4 flex items-center">
            <label
              htmlFor="amount"
              className="block text-md font-medium text-slate-100 bg-slate-800 p-2"
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
      <div className="lg:w-3/4 mt-2">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-l from-cyan-500 to-cyan-800 text-slate-200 italic">
              <th className="py-2 px-4 border border-slate-800">Description</th>
              <th className="py-2 px-4 border border-slate-800">Category</th>
              <th className="py-2 px-4 border border-slate-800">Date</th>

              <th className="py-2 px-4 border border-slate-800">Amount</th>
              <th className="py-2 px-4 border border-slate-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="text-md italic bg-sky-300">
                <td className="py-2 px-4 border border-slate-800">
                  {expense.description}
                </td>
                <td className="py-2 px-4 border border-slate-800">
                  {expense.category}
                </td>
                <td className="py-2 px-4 border border-slate-800">
                  {new Intl.DateTimeFormat("en-US").format(
                    new Date(expense.date)
                  )}
                </td>

                <td className="py-2 px-4 border border-slate-800">
                  {expense.amount}
                </td>
                <td className="py-2 px-4 border border-slate-800">
                  {/* Delete and edit expense functionality */}
                  <div className="flex items-center justify-between">
                  <img
                      src={editBtn}
                      alt="editBtn"
                      className="h-6 w-6"
                    />
                    <img
                      src={deleteBtn}
                      alt="deleteBtn"
                      className="h-10 w-10"
                      onClick={() => handleDeleteExpense(expense.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
