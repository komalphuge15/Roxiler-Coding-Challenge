
const { Rating, Store } = require('../models');
const { fn, col } = require('sequelize');

exports.submitOrUpdateRating = async (req,res) => {
  try {
    const user = req.user;
    const { storeId, rating } = req.body;
    if (!storeId || !rating) return res.status(400).json({ message: 'Missing fields' });
    const rnum = Number(rating);
    if (isNaN(rnum) || rnum < 1 || rnum > 5) return res.status(400).json({ message: 'Rating must be 1-5' });

    // ensure store exists
    const store = await Store.findByPk(storeId);
    if (!store) return res.status(404).json({ message: 'Store not found' });

    let record = await Rating.findOne({ where: { userId: user.id, storeId } });
    if (record) {
      record.rating = rnum;
      await record.save();
    } else {
      record = await Rating.create({ userId: user.id, storeId, rating: rnum });
    }

  
    const avgRow = await Rating.findOne({
      where: { storeId },
      attributes: [[fn('AVG', col('rating')), 'avgRating']]
    });
    const avg = Number(avgRow?.get('avgRating') || 0);
    // update store.avgRating
    await Store.update({ avgRating: avg }, { where: { id: storeId } });

    return res.json({ userRating: record.rating, avgRating: avg });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getRatingsForStore = async (req,res) => {
  try {
    const { storeId } = req.params;
    
    const ratings = await Rating.findAll({
      where: { storeId },
      include: [{ model: require('../models').User, as: 'user', attributes: ['id','name','email'] }]
    });
    return res.json(ratings);
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
