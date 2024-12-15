const Routes = require("./routes");

const HammingCodeController = require("../controllers/hamming_code.controller.js");

const { hammingDataValidator, hammingCodeValidator, hammingDecodeValidator } = require("../validators/hamming_code.validators.js");
const { errorValidator } = require("../validators/static.validators.js");

const controller = new HammingCodeController();

class HammingCodeRoutes extends Routes {
  static routes = [
    {
      method: "POST",
      path: "/hamming/encode",
      handler: controller.encode,
      options: {
        description: "Encode a hamming code",
        tags: ["api"],
        validate: { payload: hammingDataValidator },
        response: {
          status: {
            200: hammingCodeValidator,
            400: errorValidator,
          },
        },
      },
    },
    {
      method: "POST",
      path: "/hamming/decode",
      handler: controller.decode,
      options: {
        description: "Decode a hamming code",
        tags: ["api"],
        validate: { payload: hammingCodeValidator },
        response: {
          status: {
            200: hammingDecodeValidator,
            400: errorValidator,
          },
        },
      },
    },
  ];
}

module.exports = HammingCodeRoutes;
