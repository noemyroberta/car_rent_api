const { DataTypes } = require('sequelize');
const sequelize = require('../db_configuration');

const Car = sequelize.define('Car', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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

Car.sync({force: true});
module.exports = Car;
