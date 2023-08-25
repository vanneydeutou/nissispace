const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const ipValidationMiddleware = require("../middleware/ipValidationMiddleware");
const logger = require("../logger");

router.get("/profile", authMiddleware, ipValidationMiddleware, (req, res) => {
  const user = req.user;

  logger.info(`Retrieved profile for user ${user.username}`);

  return res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email,
    authorizedIPs: user.authorizedIPs,
  });
});

module.exports = router;
