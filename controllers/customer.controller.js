const { Op } = require("sequelize");
const { Customer } = require("../models");

// POST CUSTOMER
exports.createCustomer = async (req, res) => {
  const { name, email, address } = req.body;

  try {
    const existingCustomer = await Customer.findOne({
      where: { email },
    });

    if (existingCustomer) {
      return res.status(409).json({
        message: "Bu customer mavjud",
      });
    }

    const customer = await Customer.create({
      name,
      email,
      address,
    });

    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL CUSTOMERS
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET CUSTOMER BY ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE CUSTOMER
exports.updateCustomer = async (req, res) => {
  const { name, email, address } = req.body;

  try {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    await customer.update({
      name,
      email,
      address,
    });

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE CUSTOMER
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).send("Customer not found");
    }

    const customerData = customer.toJSON();

    await customer.destroy();

    res.status(204).send(customerData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// SEARCH CUSTOMER BY NAME
exports.searchCustomerByName = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const customers = await Customer.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            email: {
              [Op.iLike]: `%${query}%`,
            },
          },
        ],
      },
    });

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
