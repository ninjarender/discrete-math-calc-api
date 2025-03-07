const MatrixOperationsService = require("../services/matrix_operations.service");

class MatrixOperationsController {
  constructor() {
    this.matrixService = new MatrixOperationsService();
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.multiply = this.multiply.bind(this);
    this.determinant = this.determinant.bind(this);
    this.adjoint = this.adjoint.bind(this);
    this.inverse = this.inverse.bind(this);
    this.divide = this.divide.bind(this);
    this.rank = this.rank.bind(this);
  }

  add(request, h) {
    try {
      const { matrix1, matrix2 } = request.payload;
      const result = this.matrixService.add(matrix1, matrix2);
      return h.response({ result }).code(200);
    } catch (error) {
      return h
        .response({
          message: error.message || "Something went wrong",
        })
        .code(400);
    }
  }

  subtract(request, h) {
    try {
      const { matrix1, matrix2 } = request.payload;
      const result = this.matrixService.subtract(matrix1, matrix2);
      return h.response({ result }).code(200);
    } catch (error) {
      return h
        .response({
          message: error.message || "Something went wrong",
        })
        .code(400);
    }
  }

  multiply(request, h) {
    try {
      const { matrix1, matrix2 } = request.payload;
      const result = this.matrixService.multiply(matrix1, matrix2);
      return h.response({ result }).code(200);
    } catch (error) {
      return h
        .response({
          message: error.message || "Something went wrong",
        })
        .code(400);
    }
  }

  determinant(request, h) {
    try {
      const { matrix } = request.payload;
      const result = this.matrixService.determinant(matrix);
      return h.response({ result }).code(200);
    } catch (error) {
      return h
        .response({
          message: error.message || "Something went wrong",
        })
        .code(400);
    }
  }

  adjoint(request, h) {
    try {
      const { matrix } = request.payload;
      const result = this.matrixService.adjoint(matrix);
      return h.response({ result }).code(200);
    } catch (error) {
      return h
        .response({
          message: error.message || "Something went wrong",
        })
        .code(400);
    }
  }

  inverse(request, h) {
    try {
      const { matrix } = request.payload;
      const result = this.matrixService.inverse(matrix);
      return h.response({ result }).code(200);
    } catch (error) {
      return h
        .response({
          message: error.message || "Something went wrong",
        })
        .code(400);
    }
  }

  divide(request, h) {
    try {
      const { matrix1, matrix2 } = request.payload;
      const result = this.matrixService.divide(matrix1, matrix2);
      return h.response({ result }).code(200);
    } catch (error) {
      return h
        .response({
          message: error.message || "Something went wrong",
        })
        .code(400);
    }
  }

  rank(request, h) {
    try {
      const { matrix } = request.payload;
      const result = this.matrixService.rank(matrix);
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

module.exports = MatrixOperationsController;
