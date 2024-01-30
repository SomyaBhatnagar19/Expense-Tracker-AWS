// /backend/controller/expensesController.js
const express = require('express');
const router = express.Router();
const ExpensesModel = require('../models/expensesModel');
const authMiddleware = require('../middleware/auth');

// GET ALL EXPENSES
router.get('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const allExpenses = await ExpensesModel.findAll({ where: { userId } });
        res.status(200).json(allExpenses);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
});

// CREATE NEW EXPENSE
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { description, category, date, amount } = req.body;
        const userId = req.user.userId;

        const newExpense = await ExpensesModel.create({
            description,
            category,
            date,
            amount,
            userId,
        });

        res.status(201).json(newExpense);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
});

module.exports = router;
