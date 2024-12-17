const Routes = require("./routes");
const CalculateChecksumController = require("../controllers/calculate_checksum.controller");
const {
  requestSchema,
  responseSchema,
} = require("../validators/calculate_checksum.validators");
const { errorValidator } = require("../validators/static.validators");

const controller = new CalculateChecksumController();

class CalculateChecksumRoutes extends Routes {
  static routes = [
    {
      method: "POST",
      path: "/validate_checksum",
      handler: controller.handle,
      options: {
        description: "Validate checksum",
        tags: ["api"],
        validate: {
          payload: requestSchema,
        },
        response: {
          status: {
            200: responseSchema,
            400: errorValidator,
          },
        },
      },
    },
  ];
}

module.exports = CalculateChecksumRoutes;
