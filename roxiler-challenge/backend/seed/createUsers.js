const sequelize = require('../config/db');
const { User } = require('../models');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    await sequelize.sync();
    console.log('DB synced');

    const users = [
      { name: 'Administrator of Roxiler Platform', email: 'admin@roxiler.com', address: 'Admin Address 123', password: 'Admin@123', role: 'admin' },
      { name: 'Normal User of Roxiler Platform', email: 'user@roxiler.com', address: 'User Address 456', password: 'User@123', role: 'user' },
      { name: 'Store Owner of Roxiler Platform', email: 'owner@roxiler.com', address: '789 Owner Avenue, City, Country', password: 'Owner@123', role: 'store_owner' }
    ];

    for (const u of users) {
      const [user, created] = await User.findOrCreate({ where: { email: u.email }, defaults: u });
      if (created) console.log('Created user:', u.email);
      else console.log('User already exists:', u.email);
    }

    console.log('All users processed');
    process.exit(0);
  } catch (err) {
    console.error('Error creating users:', err);
    process.exit(1);
  }
})();
