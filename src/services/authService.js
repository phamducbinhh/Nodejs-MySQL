const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel.js");
const { generateToken } = require("../config/generateToken.js");

const hashPasswordUser = async (password) => {
  return await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
};

const isEmailExists = async (email) => {
  const existingUser = await UserModel.findOne({
    where: { email: email },
  });
  return !!existingUser;
};

const isPhoneExists = async (phone) => {
  const existingUser = await UserModel.findOne({
    where: { phone: phone },
  });
  return !!existingUser;
};

const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword); //true or false
};

const registerNewsUser = async ({ email, phone, password, username }) => {
  try {
    // Kiểm tra xem email hoặc phone đã tồn tại trong cơ sở dữ liệu
    if (await isEmailExists(email)) {
      throw new Error("Email đã tồn tại trong hệ thống");
    }
    if (await isPhoneExists(phone)) {
      throw new Error("Số điện thoại đã tồn tại trong hệ thống");
    }
    const hashPassword = await hashPasswordUser(password);
    const newUser = await UserModel.create({
      email,
      username,
      phone,
      password: hashPassword,
    });
    return {
      ...newUser.dataValues,
      password: "Not show",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginNewsUser = async ({ email, password }) => {
  try {
    const user = await UserModel.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new Error("Email không tồn tại trong hệ thống");
    }
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Mật khẩu không chính xác");
    }
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      token: generateToken(user.id),
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  registerNewsUser,
  loginNewsUser,
};
