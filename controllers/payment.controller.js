const { Op } = require("sequelize");
const { Payment, User, Customer, sequelize } = require("../models");
const { ValidatePayment } = require("../validation/payment.validation");

// Create payment
exports.createPayment = async (req, res) => {
  const { error } = ValidatePayment(req.body);

  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  const { amount, payment_method, status } = req.body;

  try {
    const payment = await Payment.create({
      amount,
      method: payment_method,
      status,
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all payments
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [
        {
          model: User,
          as: "user",
          include: [
            {
              model: Customer,
              as: "customer",
            },
          ],
        },
      ],
    });

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "user",
          include: [
            {
              model: Customer,
              as: "customer",
            },
          ],
        },
      ],
    });

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update payment
exports.updatePayment = async (req, res) => {
  const { error } = ValidatePayment(req.body);

  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  try {
    const payment = await Payment.findByPk(req.params.id);

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    const { amount, payment_method, status } = req.body;

    await payment.update({
      amount,
      method: payment_method,
      status,
    });

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete payment
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    await payment.destroy();

    res.status(200).json({
      message: "Payment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Search payment
exports.searchPayment = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const payments = await Payment.findAll({
      where: {
        [Op.or]: [
          sequelize.where(
            sequelize.cast(sequelize.col("method"), "varchar"),
            { [Op.iLike]: `%${query}%` }
          ),
          sequelize.where(
            sequelize.cast(sequelize.col("status"), "varchar"),
            { [Op.iLike]: `%${query}%` }
          ),
        ],
      },
    });

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
