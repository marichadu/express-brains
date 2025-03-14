// filepath: /C:/Users/mchaduneli2024/Desktop/Express-Brains/guessing-game-app/src/models/Game.js
const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Make userId optional
  },
  secretNumber: {
    type: Number,
    required: true
  },
  attempts: {
    type: Number,
    required: true
  },
  timeTaken: {
    type: Number, // Time taken in seconds
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Game', GameSchema);