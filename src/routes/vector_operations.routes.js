const VectorOperationsController = require("../controllers/vector_operations.controller");
const {
  vectorSchema,
  vectorResponse,
  magnitudeResponse,
  multipleVectorsSchema,
  twoVectorsSchema,
  threeDVectorsSchema,
  vectorAndPointSchema,
} = require("../validators/vector_operations.validators");
const { errorValidator } = require("../validators/static.validators.js");

const vectorOperationsController = new VectorOperationsController();

const routes = [
  {
    method: "POST",
    path: "/api/vectors/negative",
    handler: vectorOperationsController.handleNegativeVector,
    options: {
      validate: {
        payload: vectorSchema,
      },
      description: "Calculate the negative vector",
      tags: ["api"],
      response: {
        status: {
          200: vectorResponse,
          400: errorValidator,
        },
      },
    },
  },
  {
    method: "POST",
    path: "/api/vectors/magnitude",
    handler: vectorOperationsController.handleVectorMagnitude,
    options: {
      validate: {
        payload: vectorSchema,
      },
      description: "Calculate the magnitude (length) of a vector",
      tags: ["api"],
      response: {
        status: {
          200: magnitudeResponse,
          400: errorValidator,
        },
      },
    },
  },
  {
    method: "POST",
    path: "/api/vectors/add",
    handler: vectorOperationsController.handleVectorAddition,
    options: {
      validate: {
        payload: multipleVectorsSchema,
      },
      description: "Add multiple vectors",
      tags: ["api"],
      response: {
        status: {
          200: vectorResponse,
          400: errorValidator,
        },
      },
    },
  },
  {
    method: "POST",
    path: "/api/vectors/subtract",
    handler: vectorOperationsController.handleVectorSubtraction,
    options: {
      validate: {
        payload: multipleVectorsSchema,
      },
      description: "Subtract multiple vectors",
      tags: ["api"],
      response: {
        status: {
          200: vectorResponse,
          400: errorValidator,
        },
      },
    },
  },
  {
    method: "POST",
    path: "/api/vectors/dot-product",
    handler: vectorOperationsController.handleDotProduct,
    options: {
      validate: {
        payload: twoVectorsSchema,
      },
      description: "Calculate the dot product of two vectors",
      tags: ["api"],
      response: {
        status: {
          200: magnitudeResponse,
          400: errorValidator,
        },
      },
    },
  },
  {
    method: "POST",
    path: "/api/vectors/cross-product",
    handler: vectorOperationsController.handleCrossProduct,
    options: {
      validate: {
        payload: threeDVectorsSchema,
      },
      description: "Calculate the cross product of two 3D vectors",
      tags: ["api"],
      response: {
        status: {
          200: vectorResponse,
          400: errorValidator,
        },
      },
    },
  },
  {
    method: "POST",
    path: "/api/vectors/find-start-point",
    handler: vectorOperationsController.handleFindStartPoint,
    options: {
      validate: {
        payload: vectorAndPointSchema,
      },
      description: "Find the start point of a vector given the vector and end point",
      tags: ["api"],
      response: {
        status: {
          200: vectorResponse,
          400: errorValidator,
        },
      },
    },
  },
];

module.exports = routes;
