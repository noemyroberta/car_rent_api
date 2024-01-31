const { DataTypes } = require('sequelize');
const Car = require('./car');
const Customer = require('./customer');
const sequelize = require('../db_configuration');

const Rental = sequelize.define('Rental', {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    rentAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    carUuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Car,
            key: 'uuid',
        },
        index: true,
    },
    customerUuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Customer,
            key: 'uuid',
        },
        index: true,
    },

}, { tableName: 'tb_rental' });

Rental.belongsTo(Car, { foreignKey: 'carUuid' });
Rental.belongsTo(Customer, { foreignKey: 'customerUuid' });

Rental.sync({ force: true });
module.exports = Rental;
