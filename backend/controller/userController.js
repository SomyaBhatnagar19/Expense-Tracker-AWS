/* /backend/controller/userController.js */

const express = require("express");
const router = express.Router();

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

//CREATING NEW USER IN TABLE
router.post('/', async (req, res) => {
    try {
        const { username, email, password, isPremium } = req.body;

        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, and password are required.' });
        }

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password,
            isPremium: isPremium || false, // Default to false if isPremium is not provided
        });

        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
});

module.exports = router;
