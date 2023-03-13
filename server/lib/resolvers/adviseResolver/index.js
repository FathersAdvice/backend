"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _crud = require("../crud");
const resolvers = {
  Query: {
    getAdvices: () => (0, _crud.readFile)('advice')
  }
};
var _default = {
  resolvers
};
exports.default = _default;