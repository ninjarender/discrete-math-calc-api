const Routes = require("./routes");

const EncryptMessageController = require("../controllers/encrypt_message.controller.js");

const {
  encryptedMessageValidator,
  decryptedMessageValidator,
} = require("../validators/encrypt_message.validators.js");
const { errorValidator } = require("../validators/static.validators.js");

const controller = new EncryptMessageController();

class EncryptMessageRoutes extends Routes {
  static routes = [
    {
      method: "POST",
      path: "/decrypt_message",
      handler: controller.decrypt,
      options: {
        description: "Encrypt a message",
        tags: ["api"],
        validate: { payload: encryptedMessageValidator },
        response: {
          status: {
            200: decryptedMessageValidator,
            400: errorValidator,
          },
        },
      },
    },
  ];
}

module.exports = EncryptMessageRoutes;
