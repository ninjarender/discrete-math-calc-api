class VectorOperationsController {
  constructor() {
    this.handleNegativeVector = this.handleNegativeVector.bind(this);
    this.handleVectorMagnitude = this.handleVectorMagnitude.bind(this);
    this.handleVectorAddition = this.handleVectorAddition.bind(this);
    this.handleVectorSubtraction = this.handleVectorSubtraction.bind(this);
    this.handleDotProduct = this.handleDotProduct.bind(this);
    this.handleCrossProduct = this.handleCrossProduct.bind(this);
    this.handleFindStartPoint = this.handleFindStartPoint.bind(this);
  }

  handleNegativeVector(req, h) {
    try {
      const { vector } = req.payload;

      const negativeVector = vector.map((num) => -num);

      return h
        .response({
          result: negativeVector,
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

  handleVectorMagnitude(req, h) {
    try {
      const { vector } = req.payload;

      const magnitude = Math.sqrt(
        vector.reduce((sum, component) => sum + component * component, 0)
      );

      return h
        .response({
          result: Number(magnitude.toFixed(6)),
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

  handleVectorAddition(req, h) {
    try {
      const { vectors } = req.payload;

      const result = vectors.reduce((sum, currentVector) => {
        if (!sum) return currentVector;
        return sum.map((component, index) => component + currentVector[index]);
      });

      return h
        .response({
          result,
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

  handleVectorSubtraction(req, h) {
    try {
      const { vectors } = req.payload;

      const result = vectors.reduce((difference, currentVector, index) => {
        if (index === 0) return currentVector;
        return difference.map((component, i) => component - currentVector[i]);
      });

      return h
        .response({
          result,
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

  handleDotProduct(req, h) {
    try {
      const { vector1, vector2 } = req.payload;

      const result = vector1.reduce(
        (sum, component, index) => sum + component * vector2[index],
        0
      );

      return h
        .response({
          result: Number(result.toFixed(6)),
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

  handleCrossProduct(req, h) {
    try {
      const { vector1, vector2 } = req.payload;
      
      const result = [
        vector1[1] * vector2[2] - vector1[2] * vector2[1],  // i component
        vector1[2] * vector2[0] - vector1[0] * vector2[2],  // j component
        vector1[0] * vector2[1] - vector1[1] * vector2[0]   // k component
      ];

      return h
        .response({
          result: result.map(x => Number(x.toFixed(6))),
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

  handleFindStartPoint(req, h) {
    try {
      const { vector, endPoint } = req.payload;

      const startPoint = endPoint.map((coordinate, index) => 
        Number((coordinate - vector[index]).toFixed(6))
      );

      return h
        .response({
          result: startPoint,
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
}

module.exports = VectorOperationsController;
