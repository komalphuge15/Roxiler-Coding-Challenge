require('dotenv').config();
const sequelize = require('./config/db');
const { User, Store, Rating } = require('./models');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    // Drop all tables
    await Rating.drop();
    await Store.drop();
    await User.drop();

    console.log('All tables dropped');

    // re-sync db
    await sequelize.sync({ force: true });
    console.log('DB re-synced');

    console.log('Database reset complete. You can now run createUsers.js to seed users.');
    process.exit(0);
  } catch (err) {
    console.error('Error resetting database:', err);
    process.exit(1);
  }
})();
