const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB.js");
const UserModel = require("./UserModel.js")

const ProjectModel = sequelize.define(
  "project",
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
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
    },
  },
  {
    tableName: "project",
  }
);

ProjectModel.belongsTo(UserModel, { foreignKey: "customerId" });

module.exports = ProjectModel;
