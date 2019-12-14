/* eslint-disable no-console */
const mongoose = require('mongoose');
const config = require('../utils/configuration');

mongoose.connect(config.mongoose.db, config.mongoose.options);
mongoose.connection.once('open', () => {
  console.log('MongoDB Connected');
});
mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error: ', err);
});
