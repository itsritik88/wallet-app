const express = require('express');
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");


const signupSchema = z.object({
    username: z.string().min(3).max(30).trim().toLowerCase(),
    firstName: z.string().max(50).trim(),
    lastName: z.string().max(50).trim(),
    password: z.string().min(6)
});


router.post("/signup", async (req, res) => {
    
   try{
     const { success } = signupSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: "Incorrect inputs" });
    }

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });

    const userId = user._id;
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    });

    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "User created successfully", token });

} catch(error) {
    console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error" });
    }

});


const signinBody = z.object({
    username: z.string().min(3).max(30).trim(),
    password: z.string().min(6)
});


router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: "Incorrect inputs" });
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (!user) {
        return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
});


const updateBody = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
});


router.put("/updateUser", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: "Error while updating information" });
    }

    const updatedDoc = await User.findByIdAndUpdate(req.userId, req.body, { new: true });

    if (updatedDoc) {
        res.json({ message: "Updated successfully" });
    } else {
        res.status(400).json({ message: "Error while updating information" });
    }
});


router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    try{
        const users = await User.find({
        $or: [
            { firstName: { "$regex": filter, "$options": "i" } },
            { lastName: { "$regex": filter, "$options": "i" } }
        ],
        _id: {$ne: req.userId }
    });

    res.json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
    } catch(error) {
        res.status(500).json({message: "internal servor error"})
    }
});

module.exports = router;
