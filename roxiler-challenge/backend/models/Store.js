
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Store = sequelize.define('Store', {
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false, validate: { isEmail: true } },
  address: { type: DataTypes.STRING(400), allowNull: true },
  avgRating: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 }
}, {
  tableName: 'Stores',
  timestamps: true
});

module.exports = Store;
