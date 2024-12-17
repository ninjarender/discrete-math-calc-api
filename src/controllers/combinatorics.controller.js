const MathService = require('../services/math.service');

class CombinatoricsController {
  constructor() {
    this.mathService = new MathService();

    this.calculateCombination = this.calculateCombination.bind(this);
    this.calculateCombinationWithRepetition =
      this.calculateCombinationWithRepetition.bind(this);
    this.calculatePermutation = this.calculatePermutation.bind(this);
    this.calculatePermutationWithRepetition =
      this.calculatePermutationWithRepetition.bind(this);
    this.calculateArrangement = this.calculateArrangement.bind(this);
  }

  calculateCombination(request, h) {
    try {
      const { n, k } = request.payload;

      if (k > n) {
        return h
          .response({
            message: "k cannot be greater than n",
          })
          .code(400);
      }

      const result =
        this.mathService.factorial(n) / (this.mathService.factorial(k) * this.mathService.factorial(n - k));
      return h.response({ result }).code(200);
    } catch (error) {
      return h
        .response({
          message: error.message || "Something went wrong",
        })
        .code(400);
    }
  }

  calculateCombinationWithRepetition(request, h) {
    try {
      const { n, k } = request.payload;

      const result =
        this.mathService.factorial(n + k - 1) / (this.mathService.factorial(k) * this.mathService.factorial(n - 1));
      return h.response({ result }).code(200);
    } catch (error) {
      return h
        .response({
          message: error.message || "Something went wrong",
        })
        .code(400);
    }
  }

  calculatePermutation(request, h) {
    try {
      const { n } = request.payload;

      const result = this.mathService.factorial(n);
      return h.response({ result }).code(200);
    } catch (error) {
      return h
        .response({
          message: error.message || "Something went wrong",
        })
        .code(400);
    }
  }

  calculatePermutationWithRepetition(request, h) {
    try {
      const { n, elements } = request.payload;

      const denominator = elements.reduce((acc, element) => {
        return acc * this.mathService.factorial(element.count);
      }, 1);

      const result = this.mathService.factorial(n) / denominator;
      return h.response({ result }).code(200);
    } catch (error) {
      return h
        .response({
          message: error.message || "Something went wrong",
        })
        .code(400);
    }
  }

  calculateArrangement(request, h) {
    try {
      const { n, k } = request.payload;

      if (k > n) {
        return h
          .response({
            message: "k cannot be greater than n",
          })
          .code(400);
      }

      const result = this.mathService.factorial(n) / this.mathService.factorial(n - k);
      return h.response({ result }).code(200);
    } catch (error) {
      return h
        .response({
          message: error.message || "Something went wrong",
        })
        .code(400);
    }
  }
}

module.exports = CombinatoricsController;
