"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _users = _interopRequireDefault(require("./users"));
var _default2 = _interopRequireDefault(require("./default"));
var _type = _interopRequireDefault(require("./type"));
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
console.log(_lodash.default.merge(_default2.default, _users.default, _type.default), "im here");
var _default = _lodash.default.merge(_default2.default, _users.default, _type.default);
exports.default = _default;