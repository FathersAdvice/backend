"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _crud = require("../crud");
var _default = {
  query: {
    getAdvices: () => (0, _crud.readFile)('advice')
  }
};
exports.default = _default;