const { Sequelize } = require("sequelize");
const fs = require('fs');  

const sqlCarInserts = fs.readFileSync('./data/insert_car.sql', 'utf8');
const sqlCustomerInserts = fs.readFileSync('./data/insert_customer.sql', 'utf8');

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./car_rent.db",
});

const resultCarInsert = sequelize.query(sqlCarInserts);
const resultCustomerInsert = sequelize.query(sqlCustomerInserts);

console.log(resultCarInsert);
console.log(resultCustomerInsert);

module.exports = sequelize;
