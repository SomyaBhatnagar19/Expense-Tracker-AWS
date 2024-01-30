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

// DELETE EXPENSE
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const expenseId = req.params.id;

        // Check if the expense belongs to the user
        const expense = await ExpensesModel.findOne({
            where: { id: expenseId, userId },
        });

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        // Delete the expense
        await expense.destroy();

        res.status(204).json();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
}); 


module.exports = router;
