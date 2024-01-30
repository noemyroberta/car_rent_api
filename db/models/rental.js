const { DataTypes } = require('sequelize');
const sequelize = require('../db_configuration');
const Car = require('./car');
const Customer = require('./customer');

const Rental = sequelize.define('Rental', {
    uuid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
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
