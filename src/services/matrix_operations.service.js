class MatrixOperationsService {
  // Сложение матриц
  add(matrix1, matrix2) {
    if (
      matrix1.length !== matrix2.length ||
      matrix1[0].length !== matrix2[0].length
    ) {
      throw new Error("Matrices must have the same dimensions for addition");
    }

    return matrix1.map((row, i) => row.map((val, j) => val + matrix2[i][j]));
  }

  // Вычитание матриц
  subtract(matrix1, matrix2) {
    if (
      matrix1.length !== matrix2.length ||
      matrix1[0].length !== matrix2[0].length
    ) {
      throw new Error("Matrices must have the same dimensions for subtraction");
    }

    return matrix1.map((row, i) => row.map((val, j) => val - matrix2[i][j]));
  }

  // Умножение матриц
  multiply(matrix1, matrix2) {
    if (matrix1[0].length !== matrix2.length) {
      throw new Error(
        "Number of columns in first matrix must equal number of rows in second matrix"
      );
    }

    const result = [];
    for (let i = 0; i < matrix1.length; i++) {
      result[i] = [];
      for (let j = 0; j < matrix2[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < matrix1[0].length; k++) {
          sum += matrix1[i][k] * matrix2[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  }

  // Вычисление определителя матрицы
  determinant(matrix) {
    // Проверка на квадратную матрицу
    if (matrix.length !== matrix[0].length) {
      throw new Error("Matrix must be square to calculate determinant");
    }

    const n = matrix.length;

    // Для матрицы 1x1
    if (n === 1) {
      return matrix[0][0];
    }

    // Для матрицы 2x2
    if (n === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    // Для матриц большего размера используем разложение по первой строке
    let det = 0;
    for (let j = 0; j < n; j++) {
      det +=
        Math.pow(-1, j) *
        matrix[0][j] *
        this.determinant(this.getSubmatrix(matrix, 0, j));
    }

    return det;
  }

  // Получение подматрицы путем удаления строки и столбца
  getSubmatrix(matrix, row, col) {
    return matrix
      .filter((_, i) => i !== row)
      .map((row) => row.filter((_, j) => j !== col));
  }

  // Вычисление союзной матрицы (матрицы алгебраических дополнений)
  adjoint(matrix) {
    if (matrix.length !== matrix[0].length) {
      throw new Error("Matrix must be square to calculate adjoint");
    }

    const n = matrix.length;
    const result = [];

    for (let i = 0; i < n; i++) {
      result[i] = [];
      for (let j = 0; j < n; j++) {
        // Алгебраическое дополнение = (-1)^(i+j) * минор
        const sign = Math.pow(-1, i + j);
        const minor = this.determinant(this.getSubmatrix(matrix, i, j));
        result[i][j] = sign * minor;
      }
    }

    // Транспонирование матрицы алгебраических дополнений
    return this.transpose(result);
  }

  // Транспонирование матрицы
  transpose(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];

    for (let j = 0; j < cols; j++) {
      result[j] = [];
      for (let i = 0; i < rows; i++) {
        result[j][i] = matrix[i][j];
      }
    }

    return result;
  }

  // Вычисление обратной матрицы
  inverse(matrix) {
    if (matrix.length !== matrix[0].length) {
      throw new Error("Matrix must be square to calculate inverse");
    }

    const det = this.determinant(matrix);

    if (Math.abs(det) < 1e-10) {
      throw new Error("Matrix is singular, inverse does not exist");
    }

    const adj = this.adjoint(matrix);

    return adj.map((row) => row.map((val) => val / det));
  }

  // Деление матриц (A / B = A * B^(-1))
  divide(matrix1, matrix2) {
    const inverseMatrix2 = this.inverse(matrix2);
    return this.multiply(matrix1, inverseMatrix2);
  }

  // Вычисление ранга матрицы
  rank(matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
      throw new Error("Invalid matrix");
    }

    // Создаем копию матрицы, чтобы не изменять оригинал
    const m = matrix.map((row) => [...row]);
    const rows = m.length;
    const cols = m[0].length;

    // Приведение матрицы к ступенчатому виду с помощью метода Гаусса
    let r = 0; // ранг матрицы

    for (let c = 0; c < cols; c++) {
      // Ищем строку с ненулевым элементом в текущем столбце
      let j = r;
      while (j < rows && Math.abs(m[j][c]) < 1e-10) {
        j++;
      }

      if (j < rows) {
        // Если нашли такую строку, меняем ее местами с текущей
        if (j !== r) {
          [m[r], m[j]] = [m[j], m[r]];
        }

        // Нормализуем строку, делая первый ненулевой элемент равным 1
        const pivot = m[r][c];
        for (let k = c; k < cols; k++) {
          m[r][k] /= pivot;
        }

        // Вычитаем текущую строку из всех остальных строк
        for (let i = 0; i < rows; i++) {
          if (i !== r) {
            const factor = m[i][c];
            for (let k = c; k < cols; k++) {
              m[i][k] -= factor * m[r][k];
            }
          }
        }

        r++; // Увеличиваем ранг

        // Если ранг равен количеству строк, то дальше считать не нужно
        if (r === rows) {
          break;
        }
      }
    }

    return r;
  }
}

module.exports = MatrixOperationsService;
