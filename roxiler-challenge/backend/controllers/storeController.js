
const { Store, Rating } = require('../models');
const { Op, fn, col } = require('sequelize');

exports.listStores = async (req,res) => {
  try {
    const { name, address } = req.query;
    const where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };

    const stores = await Store.findAll({
      where,
      attributes: ['id','name','email','address', [fn('IFNULL', fn('AVG', col('Ratings.rating')), 0), 'avgRating']],
      include: [{ model: Rating, attributes: [] }],
      group: ['Store.id']
    });

   
    const result = await Promise.all(stores.map(async s => {
      const plain = s.get({ plain: true });
      let userRating = null;
      if (req.user) {
        const r = await Rating.findOne({ where: { storeId: s.id, userId: req.user.id } });
        userRating = r ? r.rating : null;
      }
      return { ...plain, avgRating: Number(plain.avgRating || 0), userRating };
    }));

    return res.json(result);
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getStoreDetails = async (req,res) => {
  try {
    const id = req.params.id;
    const store = await Store.findByPk(id);
    if (!store) return res.status(404).json({ message: 'Store not found' });

    const avgRow = await Rating.findOne({
      where: { storeId: id },
      attributes: [[fn('AVG', col('rating')), 'avgRating']]
    });
    const avgRating = Number(avgRow?.get('avgRating') || 0);

    let userRating = null;
    if (req.user) {
      const r = await Rating.findOne({ where: { storeId: id, userId: req.user.id } });
      userRating = r ? r.rating : null;
    }

    return res.json({ store, avgRating, userRating });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
