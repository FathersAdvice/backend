"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _graphqlTag = _interopRequireDefault(require("graphql-tag"));
var _templateObject;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var _default = (0, _graphqlTag.default)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    type Query {\n        getUsers: [User]\n    }\n    type Mutation { \n        signup(username: String!, email: String!, password: String!, avatar: String): MessageStatus!\n        login(email: String!, password: String!): MessageStatus!\n        removeUser(id: ID!): MessageStatus!\n        changeUser(id: ID!, username: String, email: String, password: String, avatar: String): MessageStatus!\n    }\n"])));
exports.default = _default;