const express = require("express");

/**
 * @param {*} app - express app
 */
const ConfigViewEngine = (app) => {
  app.use(express.static("./src/public"));
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
};

module.exports = ConfigViewEngine;
