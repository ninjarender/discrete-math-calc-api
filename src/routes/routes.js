class Routes {
  static routes;

  static initializRoutes(server) {
    server.route(this.routes);
  }
}

module.exports = Routes;
