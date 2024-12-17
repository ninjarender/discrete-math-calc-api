class MathService {
  factorial(n) {
    if (n === 0 || n === 1) return 1;

    return n * this.factorial(n - 1);
  }
}

module.exports = MathService;
