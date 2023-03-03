"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeFile = exports.readFile = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _helpers = require("../helpers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const readFile = field => {
  const data = _fs.default.readFileSync((0, _helpers.getFilename)("db.json"), "utf-8");
  return JSON.parse(data)[field];
};
exports.readFile = readFile;
const writeFile = (filename, data, field) => {
  let status;
  const prevData = readFile(field);
  if (prevData) {
    const onCopyStatus = (0, _helpers.checkUniqElements)(prevData, data);
    if (onCopyStatus) {
      return {
        msg: "Copy",
        status: false
      };
    }
  }
  const dataSaved = (0, _helpers.formatterData)(prevData, data, field);
  try {
    _fs.default.writeFileSync((0, _helpers.getFilename)(filename), dataSaved);
    status = {
      msg: "Success write to db",
      status: true
    };
  } catch (e) {
    status = {
      msg: "Error the write file",
      status: false
    };
  }
  return status;
};
exports.writeFile = writeFile;