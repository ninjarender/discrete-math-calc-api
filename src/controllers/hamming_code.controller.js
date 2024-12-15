class HammingCodeController {
  constructor() {
    this.encode = this.encode.bind(this);
    this.decode = this.decode.bind(this);
  }

  encode(request, h) {
    try {
      let [d0, d1, d2, d3] = request.payload.hamming_data.split("").map(num => parseInt(num));

      let p0 = d0 ^ d1 ^ d3;
      let p1 = d1 ^ d2 ^ d3;
      let p2 = d0 ^ d2 ^ d3;

      return h.response({ hamming_code: `${p0}${p1}${d0}${p2}${d1}${d2}${d3}` }).code(200);
    } catch {
      return h.response({ message: "Something went wrong" }).code(400);
    }
  }

  decode(request, h) {
    try {
      let [p0, p1, d0, p2, d1, d2, d3] = request.payload.hamming_code.split("").map(num => parseInt(num));

      let p0Check = p0 ^ d0 ^ d1 ^ d3;
      let p1Check = p1 ^ d1 ^ d2 ^ d3;
      let p2Check = p2 ^ d0 ^ d2 ^ d3;

      let syndrome = `${p0Check}${p1Check}${p2Check}`;

      if (syndrome !== "000") {
        errorPosition = parseInt(syndrome, 2) - 1;

        const varNames = ["p0", "p1", "d0", "p2", "d1", "d2", "d3"];

        this.#updateVar(
          varNames[errorPosition],
          eval(`${varNames[errorPosition]} ^ 1`)
        );
      }

      return h
        .response({
          syndrome: syndrome,
          hamming_data: `${d0}${d1}${d2}${d3}`,
        })
        .code(200);
    } catch {
      return h.response({ message: "Something went wrong" }).code(400);
    }
  }

  #updateVar(varName, value) {
    const vars = { p0, p1, d0, p2, d1, d2, d3 };

    vars[varName] = value;
    return vars;
  }
}

module.exports = HammingCodeController;
