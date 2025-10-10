
require('dotenv').config();
const mongoose = require('mongoose');


// Prefer MONGODB_URI, fall back to MONGO_URI for historical reasons
const uri = process.env.MONGOOSE_CONNECTION;

if (!uri) {
  console.error('Missing MongoDB connection string. Set MONGODB_URI in your .env file.');
  // Exit early so the app doesn't try to start without a DB connection string
  process.exit(1);
}

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
run();

module.exports = mongoose;