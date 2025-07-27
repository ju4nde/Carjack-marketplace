// routes/profile.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const db = require('../db');

router.get('/profile', authenticateToken, (req, res) => { // REQUEST FROM FRONTEND THAT NEEDS TOKEN SENT AS AUTHORIZATION 
  const userId = req.user.userId;

  db.query('SELECT id AS userId, email, first_name, last_name, car_model FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({message: 'Database error'});
    if (results.length === 0) return res.status(404).json({message: 'User not found'});

    res.json({user: results[0]}); //IF THE TOKEN IS VALIDATED BY THE MIDDLEWARE IT SHOULD RETURN THE DATA TO USERID
  }
);
});

router.patch('/carModel', authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  const { car_model } = req.body;

  try {
    db.query("UPDATE users SET car_model = ? WHERE id = ?", [car_model, userId]);
    res.json({ message: "Car model updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update car model" });
  }
});


router.get('/carmodel', authenticateToken, async (req,res) => {

});
module.exports = router;
