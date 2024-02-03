const { Sequelize } = require("sequelize");
const fs = require('fs');  

const sqlCarInserts = fs.readFileSync('./data/insert_car.sql', 'utf8');

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./car_rent.db",
});

sequelize.query(sqlInserts);
module.exports = sequelize;
