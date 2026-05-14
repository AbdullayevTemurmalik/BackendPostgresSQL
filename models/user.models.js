const bcrypt = require("bcrypt");

module.exports = (sequelize, DataType) => {
  const User = sequelize.define("User", {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataType.STRING,
      allowNull: false,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
    },
    customer_id: {
      type: DataType.INTEGER,
    },
  });

  User.beforeSave(async (user) => {
    if (user.changed("password")) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });
  return User;
};
