// /backend/controller/userController.js

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");

// GET ALL USERS FROM USER TABLE
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// CREATING NEW USER IN TABLE
router.post("/", async (req, res) => {
  try {
    const { username, email, password, isPremium } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required." });
    }

    // Check if the user with the same email already exists
    const existingUser = await User.findOne({
      where: { email: email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      isPremium: isPremium || false,
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// USER LOGIN FUNCTIONALITY
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user with the provided email exists
    const existingUser = await User.findOne({
      where: { email: email },
    });

    // Validate user existence
    if (!existingUser) {
      return res.status(404).json({ error: "User not found. Please Sign up." });
    }

    // Compare the provided password with the hashed password using bcrypt
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    // Validate password
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect Password." });
    }

    // Create a JWT token with user data after successful login
    const token = jwt.sign(
      { userId: existingUser.id, username: existingUser.username, email: existingUser.email },
      '192736565850940383654546' // Replace with your actual secret key
    );

    // Successful login
    res.status(200).json({ message: "User successfully logged in.", token });
  } catch (err) {
    console.error("Error logging in user.", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handle GET request for /SignUp/login
router.get('/login', (req, res) => {
  // You can send HTML content, redirect, or handle it based on your requirements
  res.status(200).json({ message: "GET request to /SignUp/login handled." });
});


module.exports = router;
