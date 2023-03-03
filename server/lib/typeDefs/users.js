"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _server = _interopRequireDefault(require("@apollo/server"));
var _templateObject;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var _default = (0, _server.default)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  extend Query {\n    getUsers: [User]\n  }\n  extend Mutation {\n    addUser(username: String!, email: String!, password: String!, avatar: String): MessageStatus!\n  }  \n  extend Mutation {\n    removeUser(id: ID!): MessageStatus!\n  }\n"])));
exports.default = _default;