const { userService } = require("../services/index.js");
const GetRenderHomePages = (req, res) => {
  return res.render("Home.ejs");
};

const GetRenderUserPages = async (req, res) => {
  try {
    const data = await userService.getUserList();
    return res.render("User.ejs", { data });
  } catch (Exception) {
    throw new Error(Exception.message);
  }
};

const HandleCreateUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    await userService.createNewUser(email, username, password);
    return res.redirect("/user");
  } catch (Exception) {
    throw new Error(Exception.message);
  }
};

const HanldlDeleteUser = async (req, res) => {
  try {
    await userService.deleteUserList(req.params.id);
    return res.redirect("/user");
  } catch (Exception) {
    throw new Error(Exception.message);
  }
};

const GetRenderUpdateUser = async (req, res) => {
  try {
    const userID = await userService.getUserById(req.params.id);
    return res.render("User-Update.ejs", { userID });
  } catch (Exception) {
    throw new Error(Exception.message);
  }
};

const HandleUpdateUser = async (req, res) => {
  try {
    const { email, username } = req.body;
    await userService.updateUser(email, username, req.params.id);
    return res.redirect("/user");
  } catch (Exception) {
    throw new Error(Exception.message);
  }
};

module.exports = {
  GetRenderHomePages,
  GetRenderUserPages,
  HandleCreateUser,
  HanldlDeleteUser,
  GetRenderUpdateUser,
  HandleUpdateUser,
};
