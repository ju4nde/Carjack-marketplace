const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/authMiddleware');

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

router.get()
  module.exports = router;