const Joi = require("joi");

const userSchema = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).optional(),
  email: Joi.string().required(),
  customer_id: Joi.number().integer().optional(),
});

function ValidateUser(user) {
  return userSchema.validate(user);
}

module.exports = {
  ValidateUser,
};
