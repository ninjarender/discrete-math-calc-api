class ASCIIService {
  encode(data) {
    return data
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");
  }

  decode(data) {
    return data.split(" ").map(char => String.fromCharCode(char)).join("");
  }
}

module.exports = ASCIIService;
