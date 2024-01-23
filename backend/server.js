/* /backend/server.js */

const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome, to your server.');
});

// Start the server
app.listen(3000, () => {
  console.log(`Server is running on port 3000.`);
});


