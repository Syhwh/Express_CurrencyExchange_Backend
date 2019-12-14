/* eslint-disable no-console */
const app = require('./server/server');
const config = require('./utils/configuration');

// const {startGeneratingRates} = require('./utils/rateGenerator');

const { port } = config;
// startGeneratingRates()();
// startGeneratingRates();
// app Inizialization
app.listen(port, () => console.log(`Server runing in the port ${port}`));
