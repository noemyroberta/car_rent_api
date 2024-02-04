const { Sequelize } = require("sequelize");
require('./data/insert_customer');
require('./data/insert_car');

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db_car_rent.db",
});

module.exports = sequelize;
