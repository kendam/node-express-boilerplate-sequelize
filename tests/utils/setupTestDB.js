const Sequelize = require('sequelize');
const config = require('../../src/config/config');

const sequelizeInstance = new Sequelize(config.sequelize.url);

const setupTestDB = () => {
  beforeAll(async () => {
    await sequelizeInstance.authenticate();
  });

  afterAll(async () => {
    await sequelizeInstance.close();
  });
};

module.exports = setupTestDB;
