const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db'); // adjust path if needed
const jwt = require('jsonwebtoken');

// REGISTER: /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  
  // 1. Check if user exists
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });

    if (results.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert user
    db.query(
      'INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, first_name, last_name],
      (err, result) => {
        if (err) return res.status(500).json({ message: 'Failed to register user' });

        const token = jwt.sign(
          { userId: result.insertId, email},
          process.env.JWT_SECRET || 'your_secret_key',
          { expiresIn: '1h' }
        );

        res.json({ message: 'User registered successfully!', token });
      }
    );
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ message: 'Error fetching user' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '1H' }
    );

    res.json({ message: 'Login successful', token });
  });
});
module.exports = router;
