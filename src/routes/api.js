const express = require("express");
const authenticateUser = require("../middleware/isAuth.js");
const {
  authController,
  userControllers,
  groupControllers,
} = require("../controllers/index.js");
const { validateRegister, validateLogin } = require("../config/validate.js");
const router = express.Router();

/**
 * @param {*} app - express app
 */

const initApiRoutes = (app) => {
  router.post("/register", validateRegister, authController.registerNewsUser);
  router.post("/login", validateLogin, authController.loginNewsUser);
  router.get("/user", authenticateUser, userControllers.getUser);
  router.post("/user", authenticateUser, userControllers.createUser);
  router.get("/user/:id", authenticateUser, userControllers.getUserById);
  router.put("/user/:id", authenticateUser, userControllers.updateUser);
  router.delete("/user/:id", authenticateUser, userControllers.deleteUser);
  router.get("/group", authenticateUser, groupControllers.getGroup);
  router.post("/group", authenticateUser, groupControllers.createGroup);
  return app.use("/api/v1/", router);
};

module.exports = initApiRoutes;
