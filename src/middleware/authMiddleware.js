const jwt = require("jsonwebtoken");
const User = require("../entities/User");
const logger = require("../logger");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    logger.warn("No token, authorization denied");
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne(decoded.userId);

    if (!user) {
      logger.warn("User not found");
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;

    const ipAddress =
      req.header("x-forwarded-for") || req.connection.remoteAddress;
    logger.info(
      `User ${user.username} authorized and logged in from IP address: ${ipAddress}`
    );

    next();
  } catch (error) {
    logger.error("Invalid token");
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
