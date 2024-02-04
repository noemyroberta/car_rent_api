const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db_car_rent.db",
});

module.exports = sequelize;
