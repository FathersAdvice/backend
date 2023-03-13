"use strict";

require("core-js/modules/es.promise.js");
var _resolvers = _interopRequireDefault(require("./resolvers"));
var _server = require("@apollo/server");
var _typeDefs = _interopRequireDefault(require("./typeDefs"));
var _express = require("@apollo/server/express4");
var _express2 = _interopRequireDefault(require("express"));
var _http = _interopRequireDefault(require("http"));
var _cors = _interopRequireDefault(require("cors"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _constants = require("./constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const PORT = 4002;
const app = (0, _express2.default)();
const httpServer = _http.default.createServer(app);
const server = new _server.ApolloServer({
  typeDefs: _typeDefs.default,
  resolvers: _resolvers.default
});
const startServer = async (server, port) => {
  await server.start();
  app.use("/api/graphql", (0, _cors.default)(), _bodyParser.default.json({
    limit: "50mb"
  }), (0, _express.expressMiddleware)(server, {
    context: async _ref => {
      let {
        req
      } = _ref;
      return {
        token: req.headers.token,
        NON_UNIQ_FIELD_DATA: _constants.NON_UNIQ_FIELD_DATA,
        request: req
      };
    }
  }));
  const listen = await new Promise(resolve => httpServer.listen({
    port: port
  }, resolve));
};
startServer(server, PORT);
// Modified server startup
console.log("\uD83D\uDE80 Server ready at http://localhost:".concat(PORT, "/api/graphql"));