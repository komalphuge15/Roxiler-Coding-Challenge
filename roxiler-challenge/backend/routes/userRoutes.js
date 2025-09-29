const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");


router.use(authMiddleware);

router.get("/ratings", userController.getUserRatings);


router.post("/rate/:storeId", userController.submitRating);

module.exports = router;
