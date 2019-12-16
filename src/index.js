/* eslint-disable no-console */
const http = require('http');
const socket = require('socket.io');
const app = require('./server/server');
const config = require('./utils/configuration');
const CurrencyRate = require('./database/models/currencyRateSchemma');

const { startGeneratingRates } = require('./utils/rateGenerator');

const { port } = config;
// startGeneratingRates()();
startGeneratingRates();

// create socket conection
const server = http.createServer(app);
const io = socket(server);

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    setInterval(async () => {
      const rate = await CurrencyRate.find().sort({ date: '-1' });
      client.emit('timer', rate);
    }, interval);
  });
  client.on('disconnect', () => {
    console.log('User had left');
  });
});

// app Inizialization
server.listen(port, () => console.log(`Server runing in the port ${port}`));
