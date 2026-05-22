module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("Payment", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    method: {
      type: DataTypes.ENUM("cash", "card", "click", "payme"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "paid", "cancelled"),
      defaultValue: "pending",
    },
  });

  // Modellar o'rtasidagi munosabat
  Payment.associate = (models) => {
    Payment.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  return Payment;
};
