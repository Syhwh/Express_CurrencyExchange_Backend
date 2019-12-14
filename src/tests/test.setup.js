const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

mongoose.promise = global.Promise;

async function removeAllCollections() {
  const collections = await mongoose.connection.db.collections();
  collections.map(async (collection) => {
    await collection.deleteMany();
  });
}

async function dropAllCollections() {
  const collections = await mongoose.connection.db.collections();
  collections.map(async (collection) => {
    await collection.drop();
  });
}

async function dropTestDataBase() {
  await mongoose.connection.db.dropDatabase();
}

module.exports = {
  setupDB(databaseName) {
    // Connect to Mongoose
    beforeAll(async () => {
      const url = `'mongodb://localhost:27017/${databaseName}`;
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    });

    // Cleans up database between each test
    afterEach(async () => {
      await removeAllCollections();
    });

    // Disconnect Mongoose
    afterAll(async () => {
      await dropAllCollections();
      await dropTestDataBase();
      await mongoose.connection.close();
    });
  }
};
