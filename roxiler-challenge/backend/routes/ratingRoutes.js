
const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const { auth } = require('../middlewares/authMiddleware');

router.post('/', auth(['user','admin','store_owner']), ratingController.submitOrUpdateRating);
router.get('/store/:storeId', auth(['admin','store_owner']), ratingController.getRatingsForStore);

module.exports = router;
