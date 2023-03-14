"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _graphqlTag = _interopRequireDefault(require("graphql-tag"));
var _templateObject;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var _default = (0, _graphqlTag.default)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    type Advice {\n        id: ID\n        author: User!\n        title: String!\n        describe: String\n        date_time_creater: String\n        date_time_update: String\n    }\n    type User {\n        id: ID\n        username: String!\n        password: String!\n        email: String!\n        avatar: String\n    }\n    type MessageStatus {\n        token: String\n        status: Boolean!\n        msg: String!\n        user: User\n    }\n"])));
exports.default = _default;