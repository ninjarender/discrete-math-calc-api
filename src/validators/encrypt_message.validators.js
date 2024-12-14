const Joi = require("joi");

const encryptedMessageValidator = Joi.object({
  message: Joi.string().required(),
  key: Joi.string().required(),
});

const decryptedMessageValidator = Joi.object({
  message: Joi.string().required(),
});

module.exports = {
  encryptedMessageValidator,
  decryptedMessageValidator,
};
