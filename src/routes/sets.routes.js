const Routes = require("./routes");
const SetsController = require("../controllers/sets.controller");
const {
  setsOperationRequestSchema,
  setResponseSchema,
} = require("../validators/sets.validators");
const { errorValidator } = require("../validators/static.validators");

const controller = new SetsController();

class SetsRoutes extends Routes {
  static routes = [
    {
      method: "POST",
      path: "/sets/union",
      handler: controller.union,
      options: {
        description: "Calculate union of two sets",
        tags: ["api"],
        validate: {
          payload: setsOperationRequestSchema,
        },
        response: {
          status: {
            200: setResponseSchema,
            400: errorValidator,
          },
        },
      },
    },
    {
      method: "POST",
      path: "/sets/intersection",
      handler: controller.intersection,
      options: {
        description: "Calculate intersection of two sets",
        tags: ["api"],
        validate: {
          payload: setsOperationRequestSchema,
        },
        response: {
          status: {
            200: setResponseSchema,
            400: errorValidator,
          },
        },
      },
    },
    {
      method: "POST",
      path: "/sets/difference",
      handler: controller.difference,
      options: {
        description: "Calculate difference of two sets (set1 - set2)",
        tags: ["api"],
        validate: {
          payload: setsOperationRequestSchema,
        },
        response: {
          status: {
            200: setResponseSchema,
            400: errorValidator,
          },
        },
      },
    },
  ];
}

module.exports = SetsRoutes;
