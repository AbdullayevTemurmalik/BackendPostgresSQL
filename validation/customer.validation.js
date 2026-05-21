const Joi = require("joi");

const customerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string().email().required(),

  address: Joi.string().required(),
});

function ValidateCustomer(customer) {
  return customerSchema.validate(customer);
}

module.exports = {
  ValidateCustomer,
};
