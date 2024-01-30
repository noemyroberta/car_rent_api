const { DataTypes } = require('sequelize');
const sequelize = require('../db_configuration');
const Car = require('./car');
const Customer = require('./customer');

const Rental = sequelize.define('Rental', {
    uuid: {
        type: DataTypes.UUID,
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
        type: DataTypes.UUID,
        foreignKey: true,
        allowNull: false,
        references: {
            model: Car,
            key: 'uuid'
        }
    },
    customerUuid: {
        type: DataTypes.UUID,
        foreignKey: true,
        allowNull: false,
        references: {
            model: Customer,
            key: 'uuid'
        }
    },

}, { tableName: 'tb_rental' });

Car.belongsToMany(Customer, { through: Rental });
Customer.belongsToMany(Car, { through: Rental });

Rental.sync({ alter: true });
module.exports = Rental;
