/*
Port configuration
Mongoose db configuration
*/
if (process.env.NODE_ENV === 'test') {
  const config = {
    port: process.env.PORT || 3001,
    mongoose: {
      db: process.env.MONGO_URI_TEST,
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
      }
    }
  };
  module.exports = config;
} else {
  const config = {
    port: process.env.PORT || 3001,
    mongoose: {
      db: process.env.MONGO_URI,
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
      }
    }
  };
  module.exports = config;
}
