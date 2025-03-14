// filepath: /C:/Users/mchaduneli2024/Desktop/Express-Brains/guessing-game-app/src/app.js
const express = require('express');
const session = require('express-session');
const path = require('path');
const gameRoutes = require('./routes/gameRoutes');
const adminRoutes = require('./routes/adminRoutes');
const rankingRoutes = require('./routes/rankingRoutes');
const connectDB = require('./db');
const { trusted } = require('mongoose');


const app = express();

// Connect to MongoDB
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultSecret',
  saveUninitialized: false, // Do not save uninitialized sessions
  resave: false, // Do not resave session if unmodified
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to pass user information to views
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.isAdmin = req.session.isAdmin || false; // Ensure isAdmin is always defined
  next();
});

// Use the game routes
app.use('/', gameRoutes);
app.use('/admin', adminRoutes);
app.use('/', rankingRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




