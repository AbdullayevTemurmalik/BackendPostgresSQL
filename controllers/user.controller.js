const { Op } = require("sequelize");
const { User, Customer, Payment } = require("../models");
const { ValidateUser } = require("../validation/user.validation");

// Post user
exports.createUser = async (req, res) => {
  const { error } = ValidateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { userName, email, password, customer_id, payment_id } = req.body;

  try {
    const existingUser = await User.findOne({ where: { userName } });
    if (existingUser) {
      return res.status(409).json({ message: "Bu user mavjud" });
    }

    const user = await User.create({ userName, email, password, customer_id });

    if (payment_id) {
      const payment = await Payment.findByPk(payment_id);
      if (payment) {
        await payment.update({ user_id: user.id });
      }
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GetAll users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        { model: Customer, as: "customer" },
        { model: Payment, as: "payments" },
      ],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        { model: Customer, as: "customer" },
        { model: Payment, as: "payments" },
      ],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// USER UPDATE
exports.updateUser = async (req, res) => {
  const { error } = ValidateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.update(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send("User not found");

    const userData = user.toJSON();

    await user.destroy();
    res.status(204).send(userData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Search user by name

exports.searchUserByName = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json("Search query is required");
    }
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { userName: { [Op.like]: `%${query}%` } },
          { email: { [Op.iLike]: `%${query}%` } },
        ],
      },
      include: [
        { model: Customer, as: "customer" },
        { model: Payment, as: "payments" },
      ],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
