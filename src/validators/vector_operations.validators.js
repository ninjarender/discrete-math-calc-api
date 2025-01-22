const Joi = require("joi");

const baseVector = Joi.array().items(Joi.number());

const vectorSchema = Joi.object({
  vector: baseVector.required().messages({
    "array.base": "Vector must be an array",
    "array.empty": "Vector cannot be empty",
    "number.base": "Vector elements must be numbers",
  }),
});

const vectorResponse = Joi.object({
  result: baseVector.required(),
});

const multipleVectorsSchema = Joi.object({
  vectors: Joi.array().items(baseVector).min(2).required(),
}).custom((value, helpers) => {
  const firstLength = value.vectors[0].length;
  const hasInvalidDimensions = value.vectors.some(
    (vector) => vector.length !== firstLength
  );

  if (hasInvalidDimensions) {
    return helpers.error("custom.dimensions", {
      message: "All vectors must have the same dimensions",
    });
  }
  return value;
});

const magnitudeResponse = Joi.object({
  result: Joi.number().required(),
});

const twoVectorsSchema = Joi.object({
  vector1: baseVector.required(),
  vector2: baseVector.required(),
}).custom((value, helpers) => {
  if (value.vector1.length !== value.vector2.length) {
    return helpers.error("custom.dimensions", {
      message: "Vectors must have the same dimensions",
    });
  }
  return value;
});

const threeDVectorsSchema = Joi.object({
  vector1: baseVector.length(3).required(),
  vector2: baseVector.length(3).required(),
}).messages({
  "array.length": "Cross product is only defined for 3D vectors",
});

const vectorAndPointSchema = Joi.object({
  vector: baseVector.required(),
  endPoint: baseVector.required(),
}).custom((value, helpers) => {
  if (value.vector.length !== value.endPoint.length) {
    return helpers.error("custom.dimensions", {
      message: "Vector and point must have the same dimensions",
    });
  }
  return value;
});

module.exports = {
  vectorSchema,
  vectorResponse,
  multipleVectorsSchema,
  magnitudeResponse,
  twoVectorsSchema,
  threeDVectorsSchema,
  vectorAndPointSchema,
};
