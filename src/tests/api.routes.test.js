const request = require('supertest');
const app = require('../server/server');
const CurrencyRate = require('../database/models/currencyRateSchemma');
const { setupDB } = require('./test.setup');

setupDB('testApiDatabase');

async function createTestRates() {
  const currencyData = {
    countryCode: 'USA',
    baseCurrencyCode: 'USD',
    exchangeCurrencyCode: 'EUR',
    exchangeCurrencyRate: 0.5
  };
  const result = await CurrencyRate.create(currencyData);
  return result;
}

describe('Api Endpoints', () => {
  test('validate the rate exist', async (done) => {
    await createTestRates();
    const rate = await CurrencyRate.find();
    expect(rate).toBeTruthy();
    expect(rate[0]).toHaveProperty('date', expect.any(Date));
    expect(rate[0]).toHaveProperty('countryCode', 'USA');
    expect(rate[0]).toHaveProperty('baseCurrencyCode', 'USD');
    expect(rate[0]).toHaveProperty('exchangeCurrencyCode', 'EUR');
    expect(rate[0]).toHaveProperty('exchangeCurrencyRate', expect.any(Number));
    done();
  });
  test('invalid token format in a currency conversion', async (done) => {
    await createTestRates();
    const user = await request(app)
      .post('/register')
      .send({
        userEmail: 'user2@test.com',
        userPassword: '1234'
      });
    const conversion = await request(app)
      .post('/api/convert')
      .set('authorization', `${user.body.token}`)
      .query({
        from: 'USD',
        to: 'EUR',
        amount: 100
      });
    expect(conversion.body).toBeTruthy();
    expect(conversion.statusCode).toEqual(401);
    expect(conversion.body.error).toBe('Bad token provided');

    done();
  });
  test('invalid token  in a currency conversion', async (done) => {
    const conversion = await request(app)
      .post('/api/convert')
      .set('authorization', `Bearer ${1234}`)
      .query({
        from: 'USD',
        to: 'EUR',
        amount: 100
      });
    expect(conversion.body).toBeTruthy();
    expect(conversion.statusCode).toEqual(403);
    expect(conversion.body.error).toBe('Unvalid token provided');
    done();
  });

  test('no token provided in a currency conversion', async (done) => {
    await createTestRates();
    const conversion = await request(app)
      .post('/api/convert')
      .query({
        from: 'USD',
        to: 'EUR',
        amount: 100
      });
    expect(conversion.body).toBeTruthy();
    expect(conversion.statusCode).toEqual(401);
    expect(conversion.body.error).toBe('No token provided');
    done();
  });
  test('make a currency conversion', async (done) => {
    await createTestRates();
    const user = await request(app)
      .post('/register')
      .send({
        userEmail: 'user@test.com',
        userPassword: '1234'
      });
    const conversion = await request(app)
      .post('/api/convert')
      .set('authorization', `Bearer ${user.body.token}`)
      .query({
        from: 'USD',
        to: 'EUR',
        amount: 100
      });
    expect(conversion.body).toBeTruthy();
    expect(conversion.statusCode).toEqual(200);
    expect(conversion.body.success).toBe(true);
    expect(conversion.body.savedUserExchangeData.result).toBe(50);
    done();
  });
  test('get the currency exchanged rates', async (done) => {
    await createTestRates();
    const rates = await request(app).get('/api/rates');
    expect(rates.body).toBeTruthy();
    expect(rates.statusCode).toEqual(200);
    expect(rates.body.success).toBe(true);
    done();
  });
});
