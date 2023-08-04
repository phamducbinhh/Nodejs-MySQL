const HttpStatusCode = require("../config/HttpStatusCode.js");
const { groupService } = require("../services/index.js");

const getGroup = async (req, res) => {
  try {
    const group = await groupService.getGroupService(req);
    res.status(HttpStatusCode.SUCCESS).json({
      message: "Get list group success",
      success: true,
      data: group,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
      success: false,
      data: null,
    });
  }
};

const createGroup = async (req, res) => {
  try {
    const group = await groupService.createGroupService(req.body);
    res.status(HttpStatusCode.CREATED).json({
      message: "Add group success",
      success: true,
      data: group,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
      success: false,
    });
  }
};

module.exports = {
  getGroup,
  createGroup,
};
