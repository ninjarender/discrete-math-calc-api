const Joi = require("joi");

const errorValidator = Joi.object({
  message: Joi.string(),
});

module.exports = {
  errorValidator,
};
