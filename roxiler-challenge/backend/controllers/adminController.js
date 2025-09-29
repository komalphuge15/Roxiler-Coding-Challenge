const { User, Store, Rating } = require("../models");


async function getAdminStats(req, res) {
  try {
    const users = await User.count();
    const stores = await Store.count();
    const ratings = await Rating.count();
    res.json({ users, stores, ratings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


async function getUsers(req, res) {
  try {
    const users = await User.findAll({ attributes: ["id", "name", "email", "role", "address"] });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function addUser(req, res) {
  try {
    const { name, email, address, password, role } = req.body;
    const user = await User.create({ name, email, address, password, role });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


async function getStores(req, res) {
  try {
    const stores = await Store.findAll();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function addStore(req, res) {
  try {
    const { name, email, address } = req.body;
    const store = await Store.create({ name, email, address });
    res.json(store);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getAdminStats, getUsers, addUser, getStores, addStore };
