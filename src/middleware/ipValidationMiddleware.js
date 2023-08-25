const logger = require("../logger");

const ipValidationMiddleware = (req, res, next) => {
  const user = req.user;
  const currentIpAddress =
    req.header("x-forwarded-for") || req.connection.remoteAddress;

  if (user.authorizedIPs.includes(currentIpAddress)) {
    logger.info(`Valid IP: ${currentIpAddress}`);
    next();
  } else {
    logger.warn(`Unauthorized IP: ${currentIpAddress}`);
    return res.status(403).json({ error: "Unauthorized IP address" });
  }
};

module.exports = ipValidationMiddleware;
