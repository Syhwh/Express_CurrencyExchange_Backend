const mongoose = require('mongoose');

const CurrencySchema = mongoose.Schema({
  countryCode: {
    type: String
  },
  rate: {
    type: String,
    required: [true, 'is required']
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('User', CurrencySchema);
