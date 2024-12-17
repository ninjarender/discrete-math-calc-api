const Joi = require("joi");

const combinationRequestSchema = Joi.object({
  n: Joi.number().integer().min(0).required(),
  k: Joi.number().integer().min(0).required(),
});

const permutationRequestSchema = Joi.object({
  n: Joi.number().integer().min(0).required(),
});

const permutationWithRepetitionRequestSchema = Joi.object({
  n: Joi.number().integer().min(0).required(),
  elements: Joi.array()
    .items(
      Joi.object({
        count: Joi.number().integer().min(1).required(),
      })
    )
    .required(),
});

const arrangementRequestSchema = Joi.object({
  n: Joi.number().integer().min(0).required(),
  k: Joi.number().integer().min(0).required(),
});

module.exports = {
  combinationRequestSchema,
  permutationRequestSchema,
  permutationWithRepetitionRequestSchema,
  arrangementRequestSchema,
};
