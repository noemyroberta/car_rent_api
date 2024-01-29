const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');
const sequelize = require('../db_configuration');

const Car = sequelize.define('Car', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        defaultValue: uuidv4(),
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
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, { tableName: 'tb_car' });

Car.sync();
module.exports = Car;
