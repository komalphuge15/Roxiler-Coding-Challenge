
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const bcrypt = require('bcryptjs');


const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false

  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: { msg: 'Must be a valid email' } }
  },
  address: {
    type: DataTypes.STRING(400),
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin','user','store_owner'),
    allowNull: false,
    defaultValue: 'user'
  }
}, {
  tableName: 'Users',
  timestamps: true
});


function looksHashed(pw) {
  return typeof pw === 'string' && (pw.startsWith('$2a$') || pw.startsWith('$2b$') || pw.startsWith('$2y$'));
}

User.beforeCreate(async (user) => {
  // Name length validation
  if (!user.name || user.name.length < 20 || user.name.length > 60) {
    throw new Error('Name must be between 20 and 60 characters');
  }
  // If password already hashed
  if (looksHashed(user.password)) return;

  // Password complexity checks
  if (user.password.length < 8 || user.password.length > 16) {
    throw new Error('Password must be 8-16 characters before hashing');
  }
  if (!/[A-Z]/.test(user.password)) {
    throw new Error('Password must include at least one uppercase letter');
  }
  if (!/[^A-Za-z0-9]/.test(user.password)) {
    throw new Error('Password must include at least one special character');
  }

  user.password = await bcrypt.hash(user.password, 10);
});

User.beforeUpdate(async (user) => {
  if (!user.changed('password')) return;
  if (looksHashed(user.password)) return;

  if (user.password.length < 8 || user.password.length > 16) {
    throw new Error('Password must be 8-16 characters before hashing');
  }
  if (!/[A-Z]/.test(user.password)) {
    throw new Error('Password must include at least one uppercase letter');
  }
  if (!/[^A-Za-z0-9]/.test(user.password)) {
    throw new Error('Password must include at least one special character');
  }

  user.password = await bcrypt.hash(user.password, 10);
});

User.prototype.checkPassword = async function (plain) {
  return await bcrypt.compare(plain, this.password);
};

module.exports = User;
