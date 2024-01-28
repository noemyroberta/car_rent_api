const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customer = sequelize.define('Customer', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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

Customer.sync();
module.exports = Customer;
