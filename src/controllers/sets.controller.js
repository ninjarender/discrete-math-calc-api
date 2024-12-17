const SetsService = require('../services/sets.service');

class SetsController {
  constructor() {
    this.setsService = new SetsService();
    this.union = this.union.bind(this);
    this.intersection = this.intersection.bind(this);
    this.difference = this.difference.bind(this);
  }

  union(request, h) {
    try {
      const { set1, set2 } = request.payload;
      const result = this.setsService.union(set1, set2);
      return h.response({ result }).code(200);
    } catch (error) {
      return h.response({
        message: error.message || "Something went wrong"
      }).code(400);
    }
  }

  intersection(request, h) {
    try {
      const { set1, set2 } = request.payload;
      const result = this.setsService.intersection(set1, set2);
      return h.response({ result }).code(200);
    } catch (error) {
      return h.response({
        message: error.message || "Something went wrong"
      }).code(400);
    }
  }

  difference(request, h) {
    try {
      const { set1, set2 } = request.payload;
      const result = this.setsService.difference(set1, set2);
      return h.response({ result }).code(200);
    } catch (error) {
      return h.response({
        message: error.message || "Something went wrong"
      }).code(400);
    }
  }
}

module.exports = SetsController; 