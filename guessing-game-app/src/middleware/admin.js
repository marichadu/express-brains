// filepath: /C:/Users/mchaduneli2024/Desktop/Express-Brains/guessing-game-app/src/middleware/admin.js
module.exports = (req, res, next) => {
  console.log('User:', req.session.user);
  console.log('Is Admin:', req.session.isAdmin);

  if (req.session.user && req.session.isAdmin) {
    next();
  } else {
    res.status(403).send('Access denied');
  }
};