const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB.js");

const GroupModel = sequelize.define(
  "group",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "group",
  }
);

module.exports = GroupModel;
