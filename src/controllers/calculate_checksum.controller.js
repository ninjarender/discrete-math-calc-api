class CalculateChecksumController {
  constructor() {
    this.handle = this.handle.bind(this);
  }

  validateChecksum(messageReceived, checksumReceived) {
    const bytes = messageReceived.split(" ");

    let calculatedSum = bytes.reduce((sum, byte) => {
      return sum + parseInt(byte, 2);
    }, 0);

    while (calculatedSum > 255) {
      calculatedSum = (calculatedSum & 255) + (calculatedSum >> 8);
    }

    const binarySum = calculatedSum.toString(2).padStart(8, "0");
    const calculatedChecksum = binarySum
      .split("")
      .map((bit) => (bit === "0" ? "1" : "0"))
      .join("");

    return {
      checksum_calculated: calculatedChecksum,
      result_of_checksum_verification:
        calculatedChecksum === checksumReceived ? "Correct" : "Incorrect",
    };
  }

  handle(request, h) {
    try {
      const { message_received, checksum_received } = request.payload;
      const result = this.validateChecksum(message_received, checksum_received);
      return h.response(result).code(200);
    } catch (error) {
      return h
        .response({
          message: error.message || "Something went wrong",
        })
        .code(400);
    }
  }
}

module.exports = CalculateChecksumController;
