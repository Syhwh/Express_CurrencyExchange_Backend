/* eslint-disable operator-linebreak */
const CurrencyRate = require('../database/models/currencyRateSchemma');
const UserCurrencyExchange = require('../database/models/usersCurrencyExchange');

module.exports = {
  // Currency conversion endpoint
  async convert(req, res) {
    // get the params
    const query = {
      from: req.query.from,
      to: req.query.to,
      amount: parseFloat(req.query.amount)
    };
    try {
      // get the lastest exchange rate
      const rate = await CurrencyRate.find({
        baseCurrencyCode: query.from,
        exchangeCurrencyCode: query.to
      })
        .sort({ date: '-1' })
        .limit(1);

      // make the conversion
      const exchangeResult =
        Number(query.amount) * rate[0].exchangeCurrencyRate;
      const userExchangeData = {
        user: req.userId,
        query,
        info: {
          timestamp: rate[0].date,
          rate: rate[0].exchangeCurrencyRate
        },
        result: exchangeResult
      };
      // store the user exchange data
      const savedUserExchangeData = await UserCurrencyExchange.create(
        userExchangeData
      );
      // send the succesfull response
      res.status(200).json({
        success: true,
        savedUserExchangeData
      });
    } catch (error) {
      res.status(404).json({ message: 'Not found' });
    }
  },
  async getRates(req, res) {
    try {
      const rates = await CurrencyRate.find().sort({ date: '1' });
      res.status(200).json({
        success: true,
        rates
      });
    } catch (error) {
      res.status(404).json({ message: 'Not found' });
    }
  }
};
