const express = require("express");
const router = express.Router();
const logger = require("../logger");

router.use((req, res, next) => {
  logger.info(`Received ${req.method} request at ${req.originalUrl}`);
  next();
});

module.exports = router;
