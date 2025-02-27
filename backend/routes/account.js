
const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const mongoose = require("mongoose")
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { to, amount } = req.body;

    
        const toAccount = await Account.findOne({ userId: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Invalid recipient account" });
        }

     
        const fromAccount = await Account.findOneAndUpdate(
            { userId: req.userId, balance: { $gte: amount } },
            { $inc: { balance: -amount } },
            { new: true, session } 
        );

        if (!fromAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        
        await session.commitTransaction();
        res.json({ message: "Transfer successful" });

    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ message: "Transfer failed", error: error.message });
    } finally {
        session.endSession();
    }
});

module.exports = router;