const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel.js");

const hashPasswordUser = (password) => {
  // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
  const hashPassword = bcrypt.hashSync(password, 10);
  return hashPassword;
};

/**
 * @param {*} Sử dụng SQL query thuần
 */
// Thêm mới người dùng vào cơ sở dữ liệu
// const createNewUser = (email, username, password) => {
//   return new Promise((resolve, reject) => {
//     const hashPassword = hashPasswordUser(password);
//     const sqlQuery =
//       "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
//     const values = [email, username, hashPassword];
//     connection.query(sqlQuery, values, (err, results) => {
//       if (err) {
//         console.error("Không thể thêm người dùng:", err.message);
//         reject(err);
//       }
//       console.log("Thêm người dùng thành công!");
//       resolve(results);
//     });
//   });
// };

// Hiển thị người dùng
// const getUserList = () => {
//   return new Promise((resolve, reject) => {
//     const sqlQuery = "SELECT * FROM users";
//     connection.query(sqlQuery, (err, results) => {
//       if (err) {
//         console.error("Không thể hiển thị người dùng:", err.message);
//         reject(err);
//       }
//       resolve(results);
//     });
//   });
// };

// xóa 1 user khỏi database
// const deleteUserList = (id) => {
//   return new Promise((resolve, reject) => {
//     const sqlQuery = "DELETE FROM users WHERE id = ?";
//     connection.query(sqlQuery, [id], (err, results) => {
//       if (err) {
//         console.error("Xóa người dùng không thành công:", err.message);
//         reject(err);
//       }
//       resolve(results);
//     });
//   });
// };

//hiển thị chi tiết 1 user
// const getUserById = (id) => {
//   return new Promise((resolve, reject) => {
//     const sqlQuery = "SELECT * FROM users WHERE id =?";
//     connection.query(sqlQuery, [id], (err, results) => {
//       if (err) {
//         console.error("Hiển thị chi tiết người dùng thành công:", err.message);
//         reject(err);
//       }
//       resolve(results);
//     });
//   });
// };

// Cập nhật thông tin người dùng
// const updateUser = (email, username, id) => {
//   return new Promise((resolve, reject) => {
//     const sqlQuery = "UPDATE users SET email =?, username =? WHERE id =?";
//     const values = [email, username, id];
//     connection.query(sqlQuery, values, (err, results) => {
//       if (err) {
//         console.error("Cập nhật thông tin người dùng thất bại:", err.message);
//         reject(err);
//       }
//       resolve(results);
//     });
//   });
// };
/**
 * @param {*} Sử dụng ORM để truy vấn SQL query
 */
const createNewUser = async (email, username, password) => {
  try {
    const hashPassword = hashPasswordUser(password);
    const newUser = await UserModel.create({
      email,
      username,
      password: hashPassword,
    });
    return newUser;
  } catch (error) {
    throw new Error("Không thể thêm người dùng");
  }
};

// Hiển thị người dùng
const getUserList = async () => {
  try {
    const users = await UserModel.findAll();
    return users;
  } catch (error) {
    throw new Error("Không thể lấy danh sách người dùng");
  }
};
// xóa 1 user khỏi database
const deleteUserList = async (id) => {
  try {
    const deleteUser = await UserModel.destroy({
      where: {
        id,
      },
    });
    return deleteUser;
  } catch (error) {
    throw new Error("Không thể xóa người dùng");
  }
};
//hiển thị chi tiết 1 user
const getUserById = async (id) => {
  try {
    const userId = await UserModel.findOne({
      where: {
        id,
      },
    });
    return userId;
  } catch (error) {
    throw new Error("Không thể lấy thông tin người dùng");
  }
};
// Cập nhật thông tin người dùng
const updateUser = async (email, username, id) => {
  try {
    const userUpdate = await UserModel.update(
      {
        email,
        username,
      },
      {
        where: {
          id,
        },
      }
    );
    return userUpdate;
  } catch (error) {
    throw new Error("Không thể cập nhật thông tin người dùng");
  }
};

module.exports = {
  hashPasswordUser,
  createNewUser,
  getUserList,
  deleteUserList,
  getUserById,
  updateUser,
};
