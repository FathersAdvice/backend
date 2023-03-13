"use strict";

require("core-js/modules/es.symbol.description.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeFile = exports.updateFile = exports.readFile = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.json.stringify.js");
var _fs = _interopRequireDefault(require("fs"));
var _helpers = require("../helpers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const readFile = key => {
  const data = _fs.default.readFileSync((0, _helpers.getFilename)("db.json"), "utf-8");
  return JSON.parse(data)[key];
};
exports.readFile = readFile;
const updateFile = (key, action, id, data) => {
  let status;
  const exsistFile = readFile(key);
  let newData;
  const foundData = exsistFile.find(d => d.id === id);
  switch (action) {
    case "put":
      if (foundData) {
        let dataRaw;
        Object.entries(data).forEach(_ref => {
          let [field, value] = _ref;
          dataRaw = {
            [key]: [...exsistFile.filter(d => d.id !== id), _objectSpread(_objectSpread({}, foundData), {}, {
              [field]: value
            })]
          };
        });
        _fs.default.writeFileSync((0, _helpers.getFilename)("db.json"), JSON.stringify(dataRaw));
        status = {
          msg: "Successful data change put!",
          status: true,
          user: foundData
        };
        break;
      }
      status = {
        msg: "Not found data in db!",
        status: false
      };
      break;
    case "delete":
      if (foundData) {
        newData = JSON.stringify({
          [key]: [...exsistFile.filter(d => d.id !== id)]
        });
        _fs.default.writeFileSync((0, _helpers.getFilename)("db.json"), newData);
        status = {
          msg: "Successful data change delete!",
          status: true,
          user: foundData
        };
        break;
      }
      status = {
        msg: "Not found data in db!",
        status: false
      };
      break;
  }
  return status;
};
exports.updateFile = updateFile;
const writeFile = (filename, data, key) => {
  let status;
  const prevData = readFile(key);
  if (prevData) {
    const onCopyStatus = (0, _helpers.checkUniqElements)(prevData, data);
    if (onCopyStatus) {
      return {
        msg: "Copy",
        status: false
      };
    }
  }
  const dataSaved = (0, _helpers.formatterData)(prevData, data, key);
  try {
    _fs.default.writeFileSync((0, _helpers.getFilename)(filename), dataSaved);
    status = {
      msg: "Success write to db",
      status: true,
      user: data
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