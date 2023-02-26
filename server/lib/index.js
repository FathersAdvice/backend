"use strict";

require("core-js/modules/es.promise.js");
var _server = require("@apollo/server");
var _standalone = require("@apollo/server/standalone");
var _typeDefs = _interopRequireDefault(require("./typeDefs"));
var _resolver = _interopRequireDefault(require("./resolver"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const server = new _server.ApolloServer({
  typeDefs: _typeDefs.default,
  resolvers: _resolver.default
});
let {
  url
} = new Promise((resolve, reject) => {
  try {
    const url = (0, _standalone.startStandaloneServer)(server, {
      listen: {
        port: 4002
      }
    });
    resolve(url);
  } catch (e) {
    reject(e);
  }
  ;
}).then(resolvers => resolvers);
console.log("\uD83D\uDE80  Server ready at: ".concat(url));