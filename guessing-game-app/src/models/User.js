// filepath: /c:/Users/mchaduneli2024/Desktop/Express-Brains/guessing-game-app/src/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  pseudo: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }, 
  isAdmin: {
    type: Boolean, 
    default: false
  }
});

module.exports = mongoose.model('User', UserSchema);