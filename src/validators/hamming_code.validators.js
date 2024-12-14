const Joi = require("joi");

const hammingData = Joi.string()
  .pattern(/^[01]{4}$/)
  .required();

const hammingDataValidator = Joi.object({
  hamming_data: hammingData,
});

const hammingCodeValidator = Joi.object({
  hamming_code: Joi.string()
    .pattern(/^[01]{7}$/)
    .required(),
});

const hammingDecodeValidator = Joi.object({
  syndrome: Joi.string()
    .pattern(/^[01]{3}$/)
    .required(),
  hamming_data: hammingData,
});

module.exports = {
  hammingDataValidator,
  hammingCodeValidator,
  hammingDecodeValidator,
};
