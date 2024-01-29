const { DataTypes } = require('sequelize');
const sequelize = require('../db_configuration');

const Car = sequelize.define('Car', {
    uuid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rentalRate: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, { tableName: 'tb_car' });

Car.sync({alter: true});
module.exports = Car;
