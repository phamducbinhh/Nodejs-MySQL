const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB.js");
const ProjectModel = require("./ProjectModel.js")
const UserModel = require("./UserModel.js")

const ProjectUserModel = sequelize.define(
  "project_user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProjectModel,
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
    },
  },
  {
    tableName: "project_user",
  }
);

ProjectUserModel.belongsTo(ProjectModel, { foreignKey: "project_id" });
ProjectUserModel.belongsTo(UserModel, { foreignKey: "user_id" });

module.exports = ProjectUserModel;
