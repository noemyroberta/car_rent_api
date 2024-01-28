const { DataTypes } = require('sequelize');
const sequelize = require('../db_configuration');
const Car = require('./Car');
const Customer = require('./Customer');

const Rental = sequelize.define('Rental', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
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
    }
});

Rental.belongsTo(Car);
Rental.belongsTo(Customer);

Rental.sync();
module.exports = Rental;
