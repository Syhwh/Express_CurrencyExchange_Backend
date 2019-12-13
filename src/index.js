/* eslint-disable no-console */
const app = require('./server/server');
const config = require('./utils/configuration');

const { port } = config;
// app Inizialization
app.listen(port, () => console.log(`Server runing in the port ${port}`));
