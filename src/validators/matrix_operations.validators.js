const Joi = require("joi");

// Схема для вектора (одномерный массив чисел)
const vectorSchema = Joi.array().items(Joi.number()).min(1).required();

// Схема для матрицы (массив векторов)
const matrixSchema = Joi.array().items(vectorSchema).min(1).required();

// Схема для запроса с двумя матрицами (для операций +, -, *, /)
const twoMatricesRequestSchema = Joi.object({
  matrix1: matrixSchema,
  matrix2: matrixSchema,
});

// Схема для запроса с одной матрицей (для определителя, обратной и союзной матрицы)
const singleMatrixRequestSchema = Joi.object({
  matrix: matrixSchema,
});

const singleMatrixWithScalarRequestSchema = Joi.object({
  matrix: matrixSchema,
  scalar: Joi.number().required(),
});

// Схема ответа для операций, возвращающих матрицу
const matrixResponseSchema = Joi.object({
  result: matrixSchema,
});

// Схема ответа для операций, возвращающих число (например, определитель)
const numberResponseSchema = Joi.object({
  result: Joi.number(),
});

// Схема ответа для операций, возвращающих вектор
const vectorResponseSchema = Joi.object({
  result: vectorSchema,
});

module.exports = {
  twoMatricesRequestSchema,
  singleMatrixRequestSchema,
  singleMatrixWithScalarRequestSchema,
  matrixResponseSchema,
  numberResponseSchema,
  vectorResponseSchema,
  vectorSchema,
  matrixSchema,
};
