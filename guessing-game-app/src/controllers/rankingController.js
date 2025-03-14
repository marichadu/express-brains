// Import necessary models for database operations
const Ranking = require('../models/Ranking'); // Ranking model for user rankings
const User = require('../models/User'); // User model for user details

// Define the RankingController class to handle ranking-related logic
class RankingController {
  // Method to get user rankings
// Method to get user rankings
static async getUserRankings(req, res) {
  try {
    // Find all rankings, populate userId with user details, and sort by score and time taken
    const rankings = await Ranking.find().populate('userId').sort({ score: 1, timeTaken: 1 });
    console.log('User Rankings:', rankings);
    // Render the 'classementUsers' view with the rankings data
    res.render('classementUsers', { rankings });
  } catch (err) {
    console.error(err.message); // Log server error
    res.status(500).send('Server error'); // Send server error response
  }
}
  
}


// Export the RankingController class for use in other parts of the application
module.exports = RankingController;