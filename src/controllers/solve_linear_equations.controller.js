const math = require("mathjs");

class SolveLinearEquationsController {
  constructor() {
    this.handle = this.handle.bind(this);
  }

  handle(req, h) {
    try {
      const { equations } = req.payload;
      const { matrix, constants, variables } = this.parseEquations(equations);

      const det = math.det(matrix);
      if (Math.abs(det) < 1e-10) {
        throw new Error("The system has no unique solution");
      }

      const result = {};
      variables.forEach((variable, index) => {
        const matrixCopy = matrix.map((row) => [...row]);
        matrixCopy.forEach((row, i) => {
          row[index] = constants[i][0];
        });

        const detX = math.det(matrixCopy);

        const value = detX / det;
        const rounded = Math.round(value);
        result[variable] =
          Math.abs(value - rounded) < 1e-10
            ? rounded
            : Number(value.toFixed(2));
      });

      return h
        .response({
          solution: result,
        })
        .code(200);
    } catch (error) {
      return h
        .response({
          message: error.message || "Something went wrong",
        })
        .code(400);
    }
  }

  parseEquations(equations) {
    const variables = Array.from(
      new Set(equations.join(" ").match(/[a-zA-Z]+/g))
    ).sort();

    const matrix = [];
    const constants = [];

    equations.forEach((equation) => {
      const [leftSide, rightSide] = equation
        .split("=")
        .map((part) => part.trim());

      const coefficients = new Array(variables.length).fill(0);
      let constant = 0;

      const processTerms = (terms, side) => {
        if (!terms) return;
        terms.forEach((term) => {
          term = term.trim();
          if (!term) return;

          let sign = 1;
          if (term.startsWith("-")) {
            sign = -1;
            term = term.substring(1);
          } else if (term.startsWith("+")) {
            term = term.substring(1);
          }

          if (term.match(/[a-zA-Z]+/)) {
            const parts = term.split(/([a-zA-Z]+)/);

            if (parts[0] === "" || parts[0] === " ") {
              parts[0] = "1";
            }

            const coefficient = parts[0];
            const variable = parts[1];

            const value = parseFloat(coefficient) * sign;

            const index = variables.indexOf(variable);
            if (index !== -1) {
              coefficients[index] += value * side;
            }
          } else {
            constant -= parseFloat(term) * sign * side;
          }
        });
      };

      const leftTerms =
        leftSide.match(/[+-]?\s*\d*\.?\d*[a-zA-Z]+|[+-]?\s*\d+\.?\d*/g) || [];
      const rightTerms =
        rightSide.match(/[+-]?\s*\d*\.?\d*[a-zA-Z]+|[+-]?\s*\d+\.?\d*/g) || [];

      processTerms(leftTerms, 1);
      processTerms(rightTerms, -1);

      matrix.push(coefficients);
      constants.push([constant]);
    });

    return { matrix, constants, variables };
  }
}

module.exports = SolveLinearEquationsController;
