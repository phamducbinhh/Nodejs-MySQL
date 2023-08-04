const { DataTypes } = require("sequelize");
const GroupModel = require("./GroupModel.js")
const RoleModel = require("./RoleModel.js")
const sequelize = require("../config/connectDB.js");

const GroupRoleModel = sequelize.define(
  "group_role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: GroupModel,
        key: "id",
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: RoleModel,
        key: "id",
      },
    },
  },
  {
    tableName: "group_role",
  }
);

GroupRoleModel.belongsTo(GroupModel, { foreignKey: "groupId" });
GroupRoleModel.belongsTo(RoleModel, { foreignKey: "roleId" });

module.exports = GroupRoleModel;
