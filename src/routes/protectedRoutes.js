const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const ipValidationMiddleware = require("../middleware/ipValidationMiddleware"); // Import the ipValidationMiddleware
const logger = require("../logger");

router.get("/me", authMiddleware, ipValidationMiddleware, (req, res) => {
  const user = req.user;
  const currentIpAddress =
    req.header("x-forwarded-for") || req.connection.remoteAddress;

  logger.info(
    `Received GET request for user ${user.username} from IP address: ${currentIpAddress}`
  );

  return res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email,
    authorizedIPs: user.authorizedIPs,
  });
});

module.exports = router;
