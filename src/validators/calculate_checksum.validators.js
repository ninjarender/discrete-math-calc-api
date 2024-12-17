const Joi = require("joi");

const requestSchema = Joi.object({
  message_received: Joi.string()
    .pattern(/^[01\s]+$/)
    .required(),
  checksum_received: Joi.string()
    .pattern(/^[01]{8}$/)
    .required(),
});

const responseSchema = Joi.object({
  checksum_calculated: Joi.string()
    .pattern(/^[01]{8}$/)
    .required(),
  result_of_checksum_verification: Joi.string()
    .valid("Correct", "Incorrect")
    .required(),
});

module.exports = {
  requestSchema,
  responseSchema,
};
