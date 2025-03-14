// Import the Game and Ranking models for database operations
const Game = require('../models/Game');
const Ranking = require('../models/Ranking');

// Define the GameController class to handle game-related logic
class GameController {

  // Middleware to initialize the game session
  static async initializeGame(req, res, next) {
    // Check if the secret number is not already set in the session
    if (!req.session.secretNumber) {
      // Generate a random secret number between 1 and 100
      req.session.secretNumber = Math.floor(Math.random() * 100) + 1;
      req.session.attempts = 0;      // Initialize the attempts counter
      req.session.startTime = Date.now(); // Store the start time of the game
      req.session.guesses = [];      // Initialize an array to store guesses
      console.log(`Game initialized. Start time: ${req.session.startTime}`);
      }
    next(); // Proceed to the next middleware or route handler
  }

  // Render the game page with the current message and attempts
  static async renderGamePage(req, res) {
    const message = req.session.message || ''; // Retrieve any message from the session
    req.session.message = '';                  // Clear the message from the session
    res.render('jouer', {
      message,
      attempts: req.session.attempts,
      correct: false  // or some boolean
    }); 
   }

  static async handleGuess(req, res) {
    try {
      const guess = parseInt(req.body.guess, 10);
      console.log(`Received guess: ${guess}`);
  
      const gameController = new GameController();
      const message = await gameController.validateGuess(req, guess);
      if (message) {
        return res.json({ message, correct: false, attempts: req.session.attempts });
      }
  
      req.session.attempts++;
      req.session.guesses.push(guess);
  
      // Call the static method using GameController instead of this
      const result = await GameController.checkGuess(req, guess);
      console.log(`Result: ${JSON.stringify(result)}`);
  
      if (result.correct) {
        // Capture correct number before reset
        const correctNumber = req.session.secretNumber;
        await GameController.saveGameResult(req);
        await GameController.saveRanking(req);
        await GameController.resetGame(req);

        return res.json({
          message: result.message,
          correct: true,
          attempts: req.session.attempts,
          correctNumber,
        });
      }

      return res.json({
        message: result.message,
        correct: false,
        attempts: req.session.attempts,
        correctNumber: req.session.secretNumber,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error occurred while handling guess' });
    }
  }
  
  
  async validateGuess(req, guess) {
    if (isNaN(guess) || guess < 1 || guess > 100) {
      return 'Veuillez rentrer un nombre valide entre 1 et 100.';
    } else if (req.session.guesses.includes(guess)) {
      return 'Vous avez déjà essayé ce nombre.';
    }
    return null;
  }

static async checkGuess(req, guess) {
  if (guess < req.session.secretNumber) {
    return { message: 'Le nombre est plus grand.', correct: false };
  } else if (guess > req.session.secretNumber) {
    return { message: 'Le nombre est plus petit.', correct: false };
  } else {
    const timeTaken = this.getTimeTaken(req);
    console.log(`Time taken: ${timeTaken} seconds`); // Ensure this is only logged once
    return {
      message: `Félicitations! Vous avez trouvé le nombre correct ${req.session.secretNumber} en ${req.session.attempts} tentatives et ${timeTaken.toFixed(3)} secondes!`,
      correct: true
    };
  }
}

  static async saveGameResult(req) {
    const game = new Game({
      userId: req.session.userId || null,
      secretNumber: req.session.secretNumber,
      attempts: req.session.attempts,
      timeTaken: this.getTimeTaken(req),
    });
    await game.save();
  }

  static async saveRanking(req) {
    if (req.session.userId) {
      const ranking = new Ranking({
        userId: req.session.userId,
        score: req.session.attempts,
        timeTaken: this.getTimeTaken(req),
      });
      await ranking.save();
    }
  }

  static async resetGame(req) {
    req.session.secretNumber = Math.floor(Math.random() * 100) + 1;
    req.session.attempts = 0;
    req.session.startTime = Date.now();
    req.session.guesses = [];
  }

  static getTimeTaken(req) {
    const endTime = Date.now();
    const timeTaken = (endTime - req.session.startTime) / 1000;
    console.log(`Time taken: ${timeTaken} seconds`);
    return timeTaken;
  }
}

// Export the GameController class for use in other parts of the application
module.exports = GameController;