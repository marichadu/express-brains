// filepath: /C:/Users/mchaduneli2024/Desktop/Express-Brains/guessing-game-app/src/models/Ranking.js
const mongoose = require('mongoose');

const RankingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  score: {
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

module.exports = mongoose.model('Ranking', RankingSchema);