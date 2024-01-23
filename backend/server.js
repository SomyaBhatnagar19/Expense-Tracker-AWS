/* /backend/server.js */

const express = require('express');
const cors = require('cors');

const sequelize = require('./util/database');
const userController = require('./controller/userController');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome, to your server.');
});

//User Controller
app.use('/SignUp', userController);

// Sync the Sequelize models with the database
sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
    // Start the server
    app.listen(3000, () => {
      console.log(`Server is running on port 3000.`);
    });
  });


