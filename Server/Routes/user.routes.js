const userController = require("../Controllers/user.controller");

const userRoutes = (app) => {
  app.post("/api/register", userController.register);
  app.post("/api/login", userController.login);
  app.post("/api/logout", userController.logout);
};

module.exports = userRoutes;
