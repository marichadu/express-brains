# Express Brains - Guessing Game App

Express Brains is a web-based guessing game application built with Node.js and Express. Players attempt to guess a secret number in the fewest attempts possible. The application also includes user authentication and an admin panel for managing users.

## Project Structure
```
guessing-game-app
├── src
│   ├── app.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── gameController.js
│   │   └── rankingController.js
│   ├── db.js
│   ├── middleware
│   │   └── admin.js
│   ├── models
│   │   ├── Game.js
│   │   ├── Ranking.js
│   │   └── User.js
│   ├── public
│   │   ├── css
│   │   │   └── styles.css
│   │   └── js
│   │       └── scripts.js
│   ├── routes
│   │   ├── adminRoutes.js
│   │   ├── gameRoutes.js
│   │   └── rankingRoutes.js
│   └── views
│       ├── admin
│       │   └── users.ejs
│       ├── partials
│       │   ├── header.ejs
│       │   └── footer.ejs
│       ├── classement.ejs
│       ├── connexion.ejs
│       ├── inscription.ejs
│       └── jouer.ejs
├── package.json
├── nodemon.json
└── README.md
```

## Features

- **Guessing Game**: Players guess a secret number between 1 and 100.
- **User Authentication**: Users can sign up, log in, and log out.
- **Admin Panel**: Admins can manage users.
- **Rankings**: Displays user rankings based on score and time taken.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/marichadu/express-brains.git
   cd express-brains/src

## Install Dependencies

1. Open your terminal or command prompt.
2. Navigate to your project directory:
   ```bash
   cd path/to/guessing-game-app

3. Initialize a new npm project (if not already done):
   ```
   npm init -y
   ```
4. Install the required packages :
   ```
   npm install express ejs express-session express-validator bootstrap mongoose bcryptjs
   ```
5. Install nodemon as a development dependency :
   ```
   npm install --save-dev nodemon
   ```

## Database Configuration

1. Ensure that MongoDB is installed and running on your machine.
2. Create a db.js file in the directory to handle database connections.


## Usage

After completing the installation steps, you can start the application using nodemon:
```
npx nodemon src/app.js
```

Visit  `http://localhost:3000` in your web browser to play the guessing game. Enjoy!

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

