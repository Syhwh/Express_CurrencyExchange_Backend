/* eslint-disable operator-linebreak */
const CurrencyRate = require('../database/models/currencyRateSchemma');
const UserCurrencyExchange = require('../database/models/usersCurrencyExchange');

module.exports = {
  // Currency conversion endpoint
  async convert(req, res) {
    const query = {
      from: req.query.from,
      to: req.query.to,
      amount: parseFloat(req.query.amount)
    };
    try {
      const rate = await CurrencyRate.find({
        baseCurrencyCode: query.from,
        exchangeCurrencyCode: query.to
      })
        .sort({ date: '-1' })
        .limit(1);

      const exchangeResult =
        Number(query.amount) * rate[0].exchangeCurrencyRate;
      const userExchangeData = {
        user: req.userId.id,
        query,
        info: {
          timestamp: rate[0].date,
          rate: rate[0].exchangeCurrencyRate
        },
        result: exchangeResult
      };
      const savedUserExchangeData = await UserCurrencyExchange.create(
        userExchangeData
      );

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
  },
  async getUserExchanges(req, res) {
    const { id } = req.query;
    try {
      const userExchangeData = await UserCurrencyExchange.find({
        user: id
      }).sort({ date: '1' });
      res.status(200).json({
        success: true,
        userExchangeData
      });
    } catch (error) {
      res.status(404).json({ message: 'Not found' });
    }
  }
};
