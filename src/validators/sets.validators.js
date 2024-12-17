const Joi = require("joi");

const setSchema = Joi.array().items(
  Joi.alternatives().try(
    Joi.string(),
    Joi.number()
  )
).unique();

const requiredSetSchema = setSchema.required();

const setsOperationRequestSchema = Joi.object({
  set1: requiredSetSchema,
  set2: requiredSetSchema
});

const setResponseSchema = Joi.object({
  result: requiredSetSchema
});

module.exports = {
  setsOperationRequestSchema,
  setResponseSchema
}; 