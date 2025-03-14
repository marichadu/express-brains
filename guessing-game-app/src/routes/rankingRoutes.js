// filepath: /C:/Users/mchaduneli2024/Desktop/Express-Brains/guessing-game-app/src/routes/rankingRoutes.js
const express = require('express');
const RankingController = require('../controllers/rankingController');

const router = express.Router();

router.get('/classement', RankingController.getUserRankings);

module.exports = router;