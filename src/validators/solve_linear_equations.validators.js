const Joi = require("joi");

const solveLinearEquationsSchema = Joi.object({
  equations: Joi.array().items(Joi.string()).min(1).required().messages({
    "array.base": "Equations must be an array",
    "array.min": "At least one equation is required",
    "any.required": "Equations array is required",
  }),
});

const responseSchema = Joi.object({
  solution: Joi.object().pattern(Joi.string(), Joi.number()).required(),
});

module.exports = {
  solveLinearEquationsSchema,
  responseSchema,
};
