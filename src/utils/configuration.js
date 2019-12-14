/*
Port configuration
Mongoose db configuration
*/

const config = {
  port: process.env.PORT || 3001,
  mongoose: {
    db: process.env.MONGO_URI || 'mongodb://localhost:27017/currencyApi',
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    }
  }
};

module.exports = config;
