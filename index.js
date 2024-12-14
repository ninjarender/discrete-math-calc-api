"use strict";

const Hapi = require("@hapi/hapi");
const Qs = require("qs");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");

const HammingCodeRoutes = require("./src/routes/hamming_code.routes");
const EncryptMessageRoutes = require("./src/routes/encrypt_message.routes");

const swaggerOptions = {
  info: {
    title: "Discrete Math Calculator API Documentation",
    version: "1.0.0",
  },
};

require("dotenv").config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5002,
    host: "localhost",
    query: {
      parser: (query) => Qs.parse(query),
    },
    routes: {
      cors: true,
      validate: {
        failAction: async (request, h, err) => {
          throw err;
        },
      },
      response: {
        failAction: async (request, h, err) => {
          console.log("Error: ", err);
          throw err;
        },
      },
    },
  });

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  HammingCodeRoutes.initializRoutes(server);
  EncryptMessageRoutes.initializRoutes(server);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
