
const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { optionalAuth, auth } = require('../middlewares/authMiddleware');

router.get('/', optionalAuth, storeController.listStores);
router.get('/:id', optionalAuth, storeController.getStoreDetails);

module.exports = router;
