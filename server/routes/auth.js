const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'super_secret_key_change_me'; // In prod, use .env

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Hardcoded admin credential for simplicity as per plan
    if (username === 'admin' && password === 'admin123') {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token, success: true });
    }

    res.status(401).json({ success: false, message: 'Invalid credentials' });
});

module.exports = router;
