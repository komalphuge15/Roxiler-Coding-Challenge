const sequelize = require('./config/db');
const User = require('./models/User');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

   
    await sequelize.sync(); 
    console.log('DB synced');

    const users = [
  {
    name: 'Administrator of Roxiler Platform',
    email: 'admin@roxiler.com',
    password: 'Admin@123!',
    address: '123 Admin Street, City, Country',
    role: 'admin'
  },
  {
    name: 'Normal User of Roxiler Platform', 
    email: 'user@roxiler.com',
    password: 'User@123!',
    address: '456 User Lane, City, Country',
    role: 'user'
  },
  {
    name: 'Store Owner of Roxiler Platform', 
    email: 'owner@roxiler.com',
    password: 'Owner@123!',
    address: '789 Owner Avenue, City, Country',
    role: 'store_owner'
  }
];


    for (const u of users) {
      const existing = await User.findOne({ where: { email: u.email } });
      if (!existing) {
        await User.create(u);
        console.log('Created user:', u.email);
      } else {
        console.log('User already exists:', u.email);
      }
    }

    console.log('All users processed');
    process.exit(0);
  } catch (err) {
    console.error('Error creating users:', err);
    process.exit(1);
  }
})();
