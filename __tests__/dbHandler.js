const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

/**
 * Conectar a la base de datos en memoria antes de ejecutar las pruebas
 */
const connect = async () => {
  // Cerrar cualquier conexión existente
  await mongoose.disconnect();

  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
};

/**
 * Cerrar la conexión y detener el servidor después de las pruebas
 */
const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongoServer) {
    await mongoServer.stop();
  }
};

/**
 * Limpiar todas las colecciones entre pruebas
 */
const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

module.exports = {
  connect,
  closeDatabase,
  clearDatabase,
};
