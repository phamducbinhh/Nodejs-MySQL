const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB.js");

const RoleModel = sequelize.define(
  "role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "role",
  }
);

module.exports = RoleModel;
