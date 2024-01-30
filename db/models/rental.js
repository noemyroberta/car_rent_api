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
    carUuid: {
        type: DataTypes.STRING,
        foreignKey: true,
        allowNull: false,
        unique: true,
    },
    customerUuid: {
        type: DataTypes.STRING,
        foreignKey: true,
        allowNull: false,
    },

}, { tableName: 'tb_rental' });

Rental.belongsTo(Car, { through: carUuid });
Rental.belongsTo(Customer, { through: customerUuid });

Rental.sync({ alter: true });
module.exports = Rental;
