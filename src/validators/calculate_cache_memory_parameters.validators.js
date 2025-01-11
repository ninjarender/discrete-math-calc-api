const Joi = require("joi");

const requestSchema = Joi.object({
  ram_capacity: Joi.number().required(),
  data_bus_width: Joi.number().required(),
  words_in_line: Joi.number().required(),
  cache_divider: Joi.number().required(),
  k: Joi.number().required(),
});

const kSchema = Joi.object({
  tag: Joi.number().required(),
  set: Joi.number().required(),
  offset: Joi.number().required(),
});

const responseSchema = Joi.object({
  k_1: kSchema,
  k: kSchema,
  k_lines: kSchema,
});

module.exports = {
  requestSchema,
  responseSchema,
};
