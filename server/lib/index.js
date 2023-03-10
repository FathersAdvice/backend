"use strict";

require("core-js/modules/es.promise.js");
var _resolvers = _interopRequireDefault(require("./resolvers"));
var _server = require("@apollo/server");
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _express = require("@apollo/server/express4");
var _drainHttpServer = require("@apollo/server/plugin/drainHttpServer");
var _express2 = _interopRequireDefault(require("express"));
var _http = _interopRequireDefault(require("http"));
var _cors = _interopRequireDefault(require("cors"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const PORT = 4002;
const app = (0, _express2.default)();
const httpServer = _http.default.createServer(app);
const server = new _server.ApolloServer({
  typeDefs: _fs.default.readFileSync(_path.default.join(__dirname, './typeDefs/schema.graphql'), 'utf8'),
  resolvers: _resolvers.default,
  plugins: [(0, _drainHttpServer.ApolloServerPluginDrainHttpServer)({
    httpServer
  })]
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
        token: req.headers.token
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