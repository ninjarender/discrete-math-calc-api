const Routes = require("./routes");
const MatrixOperationsController = require("../controllers/matrix_operations.controller");
const {
  twoMatricesRequestSchema,
  singleMatrixRequestSchema,
  singleMatrixWithScalarRequestSchema,
  matrixResponseSchema,
  numberResponseSchema,
  vectorResponseSchema,
} = require("../validators/matrix_operations.validators");
const { errorValidator } = require("../validators/static.validators");
const Joi = require("joi");

const controller = new MatrixOperationsController();

class MatrixOperationsRoutes extends Routes {
  static routes = [
    {
      method: "POST",
      path: "/matrix/add",
      handler: controller.add,
      options: {
        description: "Add two matrices",
        tags: ["api"],
        validate: {
          payload: twoMatricesRequestSchema,
        },
        response: {
          status: {
            200: matrixResponseSchema,
            400: errorValidator,
          },
        },
      },
    },
    {
      method: "POST",
      path: "/matrix/subtract",
      handler: controller.subtract,
      options: {
        description: "Subtract second matrix from first matrix",
        tags: ["api"],
        validate: {
          payload: twoMatricesRequestSchema,
        },
        response: {
          status: {
            200: matrixResponseSchema,
            400: errorValidator,
          },
        },
      },
    },
    {
      method: "POST",
      path: "/matrix/multiply",
      handler: controller.multiply,
      options: {
        description: "Multiply two matrices",
        tags: ["api"],
        validate: {
          payload: twoMatricesRequestSchema,
        },
        response: {
          status: {
            200: matrixResponseSchema,
            400: errorValidator,
          },
        },
      },
    },
    {
      method: "POST",
      path: "/matrix/multiply-by-scalar",
      handler: controller.multiplyByScalar,
      options: {
        description: "Multiply matrix by scalar",
        tags: ["api"],
        validate: {
          payload: singleMatrixWithScalarRequestSchema,
        },
        response: {
          status: {
            200: matrixResponseSchema,
            400: errorValidator,
          },
        },
      },
    },
    {
      method: "POST",
      path: "/matrix/determinant",
      handler: controller.determinant,
      options: {
        description: "Calculate determinant of a matrix",
        tags: ["api"],
        validate: {
          payload: singleMatrixRequestSchema,
        },
        response: {
          status: {
            200: numberResponseSchema,
            400: errorValidator,
          },
        },
      },
    },
    {
      method: "POST",
      path: "/matrix/adjoint",
      handler: controller.adjoint,
      options: {
        description: "Calculate adjoint (adjugate) of a matrix",
        tags: ["api"],
        validate: {
          payload: singleMatrixRequestSchema,
        },
        response: {
          status: {
            200: matrixResponseSchema,
            400: errorValidator,
          },
        },
      },
    },
    {
      method: "POST",
      path: "/matrix/inverse",
      handler: controller.inverse,
      options: {
        description: "Calculate inverse of a matrix",
        tags: ["api"],
        validate: {
          payload: singleMatrixRequestSchema,
        },
        response: {
          status: {
            200: matrixResponseSchema,
            400: errorValidator,
          },
        },
      },
    },
    {
      method: "POST",
      path: "/matrix/divide",
      handler: controller.divide,
      options: {
        description: "Divide first matrix by second matrix (A/B = A*B^(-1))",
        tags: ["api"],
        validate: {
          payload: twoMatricesRequestSchema,
        },
        response: {
          status: {
            200: matrixResponseSchema,
            400: errorValidator,
          },
        },
      },
    },
    {
      method: "POST",
      path: "/matrix/rank",
      handler: controller.rank,
      options: {
        description: "Calculate rank of a matrix",
        tags: ["api"],
        validate: {
          payload: singleMatrixRequestSchema,
        },
        response: {
          status: {
            200: numberResponseSchema,
            400: errorValidator,
          },
        },
      },
    },
    {
      method: "POST",
      path: "/matrix/solve-linear-system",
      handler: controller.solveLinearSystem,
      options: {
        description:
          "Solve system of linear equations using Gaussian elimination",
        tags: ["api"],
        validate: {
          payload: singleMatrixRequestSchema,
        },
        response: {
          status: {
            200: vectorResponseSchema,
            400: errorValidator,
          },
        },
      },
    },
  ];
}

module.exports = MatrixOperationsRoutes;
