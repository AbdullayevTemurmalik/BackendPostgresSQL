const Joi = require("joi");

const paymentSchema = Joi.object({
  amount: Joi.number().integer().positive().required(),

  payment_method: Joi.string()
    .valid("cash", "card", "click", "payme")
    .required(),

  status: Joi.string().valid("pending", "paid", "cancelled").optional(),
});

function ValidatePayment(payment) {
  return paymentSchema.validate(payment);
}

module.exports = {
  ValidatePayment,
};
