const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/ownerController");
const authMiddleware = require("../middlewares/authMiddleware");


router.use(authMiddleware);

router.get("/ratings", ownerController.getStoreRatings);

module.exports = router;
