const ASCIIService = require("../services/ascii.service");

const asciiService = new ASCIIService();

class EncryptMessageController {
  constructor() {
    this.decrypt = this.decrypt.bind(this);
  }

  decrypt(request, h) {
    try {
      const { message, key } = request.payload;

      const asciiKey = asciiService.encode(key).split(" ");

      let decryptedMessage = "";
      message.split(" ").forEach((char, index) => {
        let decryptedChar = "";
        for (let i = 0; i < char.length; i++) {
          decryptedChar += (char[i] ^ asciiKey[index][i]);
        }

        decryptedMessage += String.fromCharCode(parseInt(decryptedChar, 2));
      })

      return h.response({ message: decryptedMessage }).code(200);
    } catch {
      return h.response({ message: "Something went wrong" }).code(400);
    }
  }
}

module.exports = EncryptMessageController;
