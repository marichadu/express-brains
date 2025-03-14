// filepath: /c:/Users/mchaduneli2024/Desktop/Express-Brains/guessing-game-app/src/routes/adminRoutes.js
const express = require('express');
const User = require('../models/User');
const adminMiddleware = require('../middleware/admin');

const router = express.Router();

router.get('/users', adminMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.render('admin/users', { users });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



router.delete('/users/:id', adminMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).send('User deleted successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;