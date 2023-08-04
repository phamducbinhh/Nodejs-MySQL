const HttpStatusCode = require("../config/HttpStatusCode.js");
const { userApiService } = require("../services/index.js");

const getUser = async (req, res) => {
  try {
    const user = await userApiService.getUserService(req);
    res.status(HttpStatusCode.SUCCESS).json({
      message: "Get list user success",
      success: true,
      data: user,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
      success: false,
      data: null,
    });
  }
};
const createUser = async (req, res) => {
  try {
    const user = await userApiService.createUserService(req.body);
    res.status(HttpStatusCode.CREATED).json({
      message: "Create news user success",
      success: true,
      data: user,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
      success: false,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    await userApiService.deleteUserService(req.params.id);
    res.status(HttpStatusCode.SUCCESS).json({
      message: "Delete user success",
      success: true,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
      success: false,
    });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await userApiService.getUserByIdService(req.params.id);
    res.status(HttpStatusCode.SUCCESS).json({
      message: "Get details user success",
      success: true,
      data: user,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
      success: false,
      data: null,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    await userApiService.updateUserService(req);
    res.status(HttpStatusCode.SUCCESS).json({
      message: "Update news user success",
      success: true,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
      success: false,
    });
  }
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
};
