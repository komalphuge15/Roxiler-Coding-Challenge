const { Store, Rating } = require("../models");


async function getStoreRatings(req, res) {
  try {
    const storeId = req.user.id; 
    const ratings = await Rating.findAll({ where: { storeId } });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getStoreRatings };
