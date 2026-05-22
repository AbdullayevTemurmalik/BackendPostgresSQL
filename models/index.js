const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user.models")(sequelize, Sequelize);
const Customer = require("./customer.model")(sequelize, Sequelize);
const Payment = require("./payment.model")(sequelize, Sequelize);

User.associate(sequelize.models);
Customer.associate(sequelize.models);
Payment.associate(sequelize.models);

module.exports = {
  User,
  Customer,
  Payment,
  sequelize,
};
