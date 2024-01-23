/* /backend/routes/userRoutes.js */

const express = require('express');
const router = express.Router();

const User = require('../models/user');

//GET ALL USERS FROM USER TABLE
router.get('/', async (req, res) => {
    try{
        const allUsers = await User.findAll();
        res.status(200).json(allUsers);
        } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error.'})
    }
})

module.exports = router;