const Routes = require("./routes");

const CalculateCacheMemoryParametersController = require("../controllers/calculate_cache_memory_parameters.controller.js");

const { requestSchema, responseSchema } = require("../validators/calculate_cache_memory_parameters.validators.js");
const { errorValidator } = require("../validators/static.validators.js");

const controller = new CalculateCacheMemoryParametersController();

class CalculateCacheMemoryParametersRoutes extends Routes {
  static routes = [
    {
      method: "POST",
      path: "/calculate-cache-memory-parameters",
      handler: controller.handle,
      options: {
        description: "Calculate cache memory parameters",
        tags: ["api"],
        validate: { payload: requestSchema },
        response: { status: { 200: responseSchema, 400: errorValidator } },
      },
    },
  ];
}

module.exports = CalculateCacheMemoryParametersRoutes;
