const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const mongoose = require('mongoose');

const JWT_SECRET = process.env.JWT_SECRET || 'bhagwatiproperty_secret_key_2024';

// ── User Schema ──
const userSchema = new mongoose.Schema({
    name:      { type: String, required: true, trim: true },
    email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone:     { type: String, required: true, trim: true },
    password:  { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// ── REGISTER ──
router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Validation
        if (!name || !email || !phone || !password)
            return res.status(400).json({ message: 'All fields are required.' });

        if (password.length < 6)
            return res.status(400).json({ message: 'Password must be at least 6 characters.' });

        // Check existing user
        const existing = await User.findOne({ email });
        if (existing)
            return res.status(409).json({ message: 'Email already registered. Please login.' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Save user
        const user = new User({ name, email, phone, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'Account created successfully!' });

    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
});

// ── LOGIN ──
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: 'Email and password are required.' });

        // Find user
        const user = await User.findOne({ email });
        if (!user)
            return res.status(401).json({ message: 'Invalid email or password.' });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Invalid email or password.' });

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id:    user._id,
                name:  user.name,
                email: user.email,
                phone: user.phone
            }
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
});

module.exports = router;