const express = require("express");
const dotenv = require("dotenv");
const { initApiRoutes, initWebRoutes } = require("./src/routes/index.js");
const ConfigViewEngine = require("./src/config/viewEngine.js");
const bodyParser = require("body-parser");
const sequelize = require("./src/config/connectDB.js");
const cors = require("cors");
// const UserModel = require("./src/models/UserModel.js");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
ConfigViewEngine(app);
initWebRoutes(app);
initApiRoutes(app);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// UserModel.sync({ alter: true });

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
