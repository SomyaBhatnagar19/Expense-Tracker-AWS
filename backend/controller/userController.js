/* /backend/controller/userController.js */

const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require("../models/user");

//GET ALL USERS FROM USER TABLE
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

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password,
      isPremium: isPremium || false,
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// LOGIN USER
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate required fields
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required for login." });
      }
  
      // Check if the user with the provided email exists
      const existingUser = await User.findOne({
        where: { email: email },
      });
  
      if (!existingUser) {
        return res.status(404).json({ error: "User not found." });
      }
  
      // Check if the password is correct
      if (existingUser.password !== password) {
        return res.status(400).json({ error: "Invalid password." });
      }
  
      // Generate a JWT
      const token = jwt.sign({ userId: existingUser.id }, "192736565850940383654546", {
        expiresIn: "1h", // Token expiration time
      });
  
      res.status(200).json({ message: "Login successful!", token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error." });
    }
  });

module.exports = router;
