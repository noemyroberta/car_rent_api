const { DataTypes } = require('sequelize');
const sequelize = require('../db_configuration');

const Customer = sequelize.define('Customer', {
    uuid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    rentedBefore: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    registerDate: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
    },
}, { tableName: 'tb_customer' });

Customer.sync({alter: true});
module.exports = Customer;
