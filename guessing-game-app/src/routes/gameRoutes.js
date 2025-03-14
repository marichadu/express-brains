const express = require('express');
const { body } = require('express-validator');
const GameController = require('../controllers/gameController');
const AuthController = require('../controllers/authController');

const router = express.Router();

// Initialize game state
router.use(GameController.initializeGame);

router.get('/', (req, res) => {
  res.redirect('/jouer');
});

router.get('/jouer', GameController.renderGamePage);

router.post('/guess', GameController.handleGuess);

// Add the /start-game endpoint
router.post('/start-game', (req, res) => {
  req.session.startTime = Date.now();
  console.log(`Game started. Start time: ${req.session.startTime}`);
  res.json({ message: 'Game started' });
});

router.get('/connexion', AuthController.getConnexion);

router.post('/connexion', [
  body('pseudo').notEmpty().withMessage('Pseudo est obligatoire'),
  body('mdp').notEmpty().withMessage('Mot de passe est obligatoire')
], AuthController.postConnexion);

router.get('/inscription', AuthController.getInscription);

router.post('/inscription', [
  body('email').isEmail().withMessage('Email invalide'),
  body('pseudo').notEmpty().withMessage('Pseudo est obligatoire'),
  body('mdp').isLength({ min: 6 }).withMessage('Mot de passe doit contenir au moins 6 caractères'),
  body('confirmMdp').custom((value, { req }) => {
    if (value !== req.body.mdp) {
      throw new Error('Les mots de passe ne correspondent pas');
    }
    return true;
  })
], AuthController.postInscription);

router.get('/logout', AuthController.logout);

module.exports = router;