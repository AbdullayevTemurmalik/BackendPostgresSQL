const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user.models")(sequelize, Sequelize);

module.exports = {
  User,
};
