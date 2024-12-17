const Joi = require("joi");

const errorValidator = Joi.object({
  message: Joi.string(),
});

const resultValidator = Joi.object({
  result: Joi.number().required(),
});

module.exports = {
  errorValidator,
  resultValidator,
};
