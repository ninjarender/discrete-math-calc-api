const Routes = require("./routes");
const CombinatoricsController = require("../controllers/combinatorics.controller");
const {
  combinationRequestSchema,
  permutationRequestSchema,
  permutationWithRepetitionRequestSchema,
  arrangementRequestSchema,
} = require("../validators/combinatorics.validators");
const {
  errorValidator,
  resultValidator,
} = require("../validators/static.validators");

const controller = new CombinatoricsController();

class CombinatoricsRoutes extends Routes {
  static routes = [
    {
      method: "POST",
      path: "/combinatorics/combination",
      handler: controller.calculateCombination,
      options: {
        description: "Calculate combination without repetition",
        tags: ["api"],
        validate: {
          payload: combinationRequestSchema,
        },
        response: {
          status: {
            200: resultValidator,
            400: errorValidator,
          },
        },
      },
    },
    {
      method: "POST",
      path: "/combinatorics/combination-with-repetition",
      handler: controller.calculateCombinationWithRepetition,
      options: {
        description: "Calculate combination with repetition",
        tags: ["api"],
        validate: {
          payload: combinationRequestSchema,
        },
        response: {
          status: {
            200: resultValidator,
            400: errorValidator,
          },
        },
      },
    },
    {
      method: "POST",
      path: "/combinatorics/permutation",
      handler: controller.calculatePermutation,
      options: {
        description: "Calculate permutation without repetition",
        tags: ["api"],
        validate: {
          payload: permutationRequestSchema,
        },
        response: {
          status: {
            200: resultValidator,
            400: errorValidator,
          },
        },
      },
    },
    {
      method: "POST",
      path: "/combinatorics/permutation-with-repetition",
      handler: controller.calculatePermutationWithRepetition,
      options: {
        description: "Calculate permutation with repetition",
        tags: ["api"],
        validate: {
          payload: permutationWithRepetitionRequestSchema,
        },
        response: {
          status: {
            200: resultValidator,
            400: errorValidator,
          },
        },
      },
    },
    {
      method: "POST",
      path: "/combinatorics/arrangement",
      handler: controller.calculateArrangement,
      options: {
        description: "Calculate arrangement (partial permutation)",
        tags: ["api"],
        validate: {
          payload: arrangementRequestSchema,
        },
        response: {
          status: {
            200: resultValidator,
            400: errorValidator,
          },
        },
      },
    },
  ];
}

module.exports = CombinatoricsRoutes;
