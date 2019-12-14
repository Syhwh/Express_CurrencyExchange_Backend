const CurrencyRate = require('../database/models/currencyRateSchemma');

function generateRate(min, max) {
  return Math.random() * (max - min) + min;
}

const currencyData = {
  countryCode: 'USA',
  baseCurrencyCode: 'USD',
  exchangeCurrencyCode: 'EUR',
  exchageCurrencyRate: generateRate(0, 5)
};

const saveRates = async () => {
  await CurrencyRate.create(currencyData);
};

function startGeneratingRates() {
  setInterval(saveRates, 1000 * 60 * 10);
}

module.exports = {
  startGeneratingRates
};
