const mongoose = require('mongoose');

const CurrencyRateSchemma = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  countryCode: {
    type: String
  },
  baseCurrencyCode: {
    type: String
  },
  exchangeCurrencyCode: {
    type: String
  },
  exchangeCurrencyRate: {
    type: Number
  }
});

module.exports = mongoose.model('CurrencyRate', CurrencyRateSchemma);
