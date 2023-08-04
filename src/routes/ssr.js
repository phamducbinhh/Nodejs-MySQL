const express = require("express");
const { homeController } = require("../controllers/index.js");
const router = express.Router();

/**
 * @param {*} app - express app
 */

const initWebRoutes = (app) => {
  router.get("/", homeController.GetRenderHomePages);
  router.get("/user", homeController.GetRenderUserPages);
  router.post("/user/create-user", homeController.HandleCreateUser);
  router.post("/delete-user/:id", homeController.HanldlDeleteUser);
  router.get("/update-user/:id", homeController.GetRenderUpdateUser);
  router.post("/user/update-user/:id", homeController.HandleUpdateUser);
  return app.use("/", router);
};

module.exports = initWebRoutes;
