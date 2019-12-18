require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const router = require('../routes');

const app = express();

// adding Helmet to enhance the API's security
app.use(helmet());

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// enabling CORS for all requests
app.use(
  cors({
    origin: '*'
  })
);

// adding morgan to log HTTP requests
if (process.env.NODE_ENV === 'develop') {
  app.use(morgan('dev'));
}

// Database
require('../database/database');

// Routes
router(app);

// Handle errors
app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Server Error', error: err.message });
  next();
});

module.exports = app;
