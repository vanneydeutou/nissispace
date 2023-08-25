const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const requestLogger = require("../middleware/requestLogger"); 

router.post("/login", requestLogger, authController.loginUser);
router.post("/register", userController.registerUser);

module.exports = router;
