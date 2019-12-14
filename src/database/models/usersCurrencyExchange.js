const mongoose = require('mongoose');

const UserCurrencyExchangeSchemma = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  query: {
    type: Object
  },
  info: {
    type: Object
  },
  result: { type: Number }
});

module.exports = mongoose.model(
  'UsersCurrencyExchange',
  UserCurrencyExchangeSchemma
);
