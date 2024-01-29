const { DataTypes } = require('sequelize');
const sequelize = require('../db_configuration');
const Car = require('./Car');
const Customer = require('./Customer');

const Rental = sequelize.define('Rental', {
    uuid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now(),
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    rentAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },

}, { tableName: 'tb_rental' });

Rental.belongsTo(Car);
Rental.belongsTo(Customer);

Rental.sync({ alter: true });
module.exports = Rental;
