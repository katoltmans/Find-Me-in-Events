const userController = require("../Controllers/user.controller");

const userRoutes = (app) => {
  app.post("/api/register", userController.register);
  app.post("/api/login", userController.login);
  app.post("/api/logout", userController.logout);
  app.put("/api/forgotpassword", userController.forgotPassword);
  app.put("/api/resetpassword", userController.resetPassword);
};

module.exports = userRoutes;
