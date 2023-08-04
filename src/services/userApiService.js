const UserModel = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const getUserService = async (req) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);
    const offset = (page - 1) * limit;
    const { rows, count } = await UserModel.findAndCountAll({
      attributes: [
        "id",
        "username",
        "email",
        "phone",
        "address",
        "sex",
        "groupId",
      ],
      offset,
      limit,
    });
    return {
      totalItems: count,
      itemsPerPage: limit,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      items: rows,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const createUserService = async ({
  email,
  phone,
  password,
  username,
  address,
  sex,
  groupId,
}) => {
  try {
    const user = await UserModel.findOne({
      where: { email: email },
    });
    if (user) {
      throw new Error("Email đã tồn tại trong hệ thống");
    }
    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );
    const newUser = await UserModel.create({
      email,
      phone,
      password: hashPassword,
      username,
      address,
      sex,
      groupId,
    });
    return {
      ...newUser.dataValues,
      password: "Not show",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUserService = async (id) => {
  try {
    const user = await UserModel.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new Error("Không tìm thấy người dùng với id đã cho");
    }
    await UserModel.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByIdService = async (id) => {
  try {
    const user = await UserModel.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new Error("Không tìm thấy người dùng với id đã cho");
    }
    const userId = await UserModel.findOne({
      where: {
        id,
      },
      attributes: [
        "id",
        "username",
        "email",
        "phone",
        "address",
        "sex",
        "groupId",
      ],
    });
    return userId;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUserService = async (req) => {
  const { username, address, sex, groupId } = req.body;
  try {
    await UserModel.update(
      {
        username,
        address,
        sex,
        groupId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getUserService,
  createUserService,
  deleteUserService,
  getUserByIdService,
  updateUserService,
};
