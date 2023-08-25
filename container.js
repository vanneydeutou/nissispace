const { createContainer, asClass } = require("awilix");

// const userController = require("./controllers/userController");
// const authController = require("./controllers/authController");

const container = createContainer();

container.register({
  //   userController: asClass(userController).scoped(),
  //   authController: asClass(authController).scoped(),
});

module.exports = container;
