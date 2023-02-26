"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFilename = exports.formatterData = exports.cryptoPassword = exports.checkUniqElements = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.json.stringify.js");
var _path = _interopRequireDefault(require("path"));
var crypto = _interopRequireWildcard(require("crypto"));
var _constants = require("./constants");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const onCheckField = (checkedObject, keys, checkObject) => {
  let dataCheckOnUniq;
  checkedObject.forEach(check => {
    keys.forEach(key => {
      if (dataCheckOnUniq) return;
      dataCheckOnUniq = check[key] === checkObject[key];
    });
  });
  return dataCheckOnUniq;
};
const checkUniqElements = (dataExsist, data) => {
  const keys = Object.keys(data).filter(key => !_constants.NON_UNIQ_FIELD_DATA.includes(key));
  return onCheckField(dataExsist, keys, data);
};
exports.checkUniqElements = checkUniqElements;
const cryptoPassword = password => crypto.createHmac("sha256", password).digest("hex");
exports.cryptoPassword = cryptoPassword;
const getFilename = path => _path.default.resolve(__dirname, "db/".concat(path));
exports.getFilename = getFilename;
const formatterData = (prevData, data, key) => {
  prevData = prevData[key] ? {
    [key]: [...prevData[key], data]
  } : {
    [key]: [data]
  };
  return JSON.stringify(prevData);
};
exports.formatterData = formatterData;