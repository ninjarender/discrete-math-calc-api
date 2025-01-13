const Routes = require("./routes");

const SolveLinearEquationsController = require("../controllers/solve_linear_equations.controller");
const {
  solveLinearEquationsSchema,
  responseSchema,
} = require("../validators/solve_linear_equations.validators");
const { errorValidator } = require("../validators/static.validators.js");

const controller = new SolveLinearEquationsController();

class solveLinearEquationsRoutes extends Routes {
  static routes = [
    {
      method: "POST",
      path: "/solve-linear-equations",
      handler: controller.handle,
      options: {
        validate: {
          payload: solveLinearEquationsSchema,
        },
        response: {
          status: {
            200: responseSchema,
            400: errorValidator,
          },
        },
      },
    },
  ];
}

module.exports = solveLinearEquationsRoutes;
