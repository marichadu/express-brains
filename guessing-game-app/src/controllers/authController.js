// Import necessary modules
const { body, validationResult } = require('express-validator'); // For input validation
const User = require('../models/User'); // User model for database operations
const bcrypt = require('bcryptjs'); // For hashing passwords

class AuthController {
  // Render the login page with no errors initially
  static getConnexion(req, res) {
    res.render('connexion', { errors: [] });
  }

  // Handle login form submission
  static async postConnexion(req, res) {
    // Validate input and check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('connexion', { errors: errors.array() });
    }

    const { pseudo, mdp } = req.body; // Extract username and password from request body
    try {
      // Find user by username
      const user = await User.findOne({ pseudo });
      if (!user) {
        // If user not found, render login page with error
        return res.status(400).render('connexion', { errors: [{ msg: 'Invalid credentials' }] });
      }

      // Compare provided password with stored hashed password
      const isMatch = await bcrypt.compare(mdp, user.password);
      if (!isMatch) {
        // If password doesn't match, render login page with error
        return res.status(400).render('connexion', { errors: [{ msg: 'Invalid credentials' }] });
      }

      // Store user information in session
      req.session.user = user.pseudo;
      req.session.userId = user._id; // Store userId in session
      req.session.isAdmin = user.isAdmin; // Store isAdmin in session
     
      // Debugging: Log session data
      console.log('Session User:', req.session.user);
      console.log('Session UserId:', req.session.userId);
      console.log('Session IsAdmin:', req.session.isAdmin);

      res.redirect('/jouer'); // Redirect to game page
    } catch (err) {
      console.error(err.message); // Log server error
      res.status(500).send('Server error'); // Send server error response
    }
  }

  // Render the registration page with no errors initially
  static getInscription(req, res) {
    res.render('inscription', { errors: [] });
  }

  // Handle registration form submission
  static async postInscription(req, res) {
    // Validate input and check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('inscription', { errors: errors.array() });
    }

    const { email, pseudo, mdp } = req.body; // Extract email, username, and password from request body
    try {
      // Check if a user with the same email already exists
      let user = await User.findOne({ email });
      if (user) {
        // If user exists, render registration page with error
        return res.status(400).render('inscription', { errors: [{ msg: 'User already exists' }] });
      }

      // Create a new user instance
      user = new User({
        email,
        pseudo,
        password: mdp
      });

      // Generate salt and hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(mdp, salt);

      // Save the new user to the database
      await user.save();

      // Store user information in session
      req.session.user = user.pseudo;
      req.session.userId = user._id; // Store userId in session
      req.session.isAdmin = user.isAdmin; // Store isAdmin in session
      
      // Debugging: Log session data
      console.log('Session User:', req.session.user);
      console.log('Session UserId:', req.session.userId);
      console.log('Session IsAdmin:', req.session.isAdmin);

      res.redirect('/jouer'); // Redirect to game page
    } catch (err) {
      console.error(err.message); // Log server error
      res.status(500).send('Server error'); // Send server error response
    }
  }

  // Handle user logout
  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.redirect('/jouer'); // If error, redirect to game page
      }
      res.redirect('/connexion'); // Redirect to login page
    });
  }
}

module.exports = AuthController; // Export the AuthController class