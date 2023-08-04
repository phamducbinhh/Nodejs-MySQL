const GroupModel = require("../models/GroupModel.js");

const createGroupService = async ({ name, description }) => {
  try {
    const group = await GroupModel.create({
      name,
      description,
    });
    return group;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getGroupService = async (req) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);
    const offset = (page - 1) * limit;
    const { rows, count } = await GroupModel.findAndCountAll({
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

module.exports = {
  createGroupService,
  getGroupService,
};
