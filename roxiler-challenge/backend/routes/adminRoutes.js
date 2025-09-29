const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");


router.use(authMiddleware);


router.get("/stats", adminController.getAdminStats);

// Users
router.get("/users", adminController.getUsers);
router.post("/add-user", adminController.addUser);

// Stores
router.get("/stores", adminController.getStores);
router.post("/add-store", adminController.addStore);

module.exports = router;
