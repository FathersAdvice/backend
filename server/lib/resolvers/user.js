"use strict";

require("core-js/modules/es.symbol.description.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.parse-int.js");
var _crud = require("./crud");
var _helpers = require("../helpers");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
const _excluded = ["id"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const APP_SECRET = 'GraphQL-is-aw3some';
const KEY_DB = 'users';
const statusCompilation = function statusCompilation(throwMessage) {
  let status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return {
    msg: "".concat(throwMessage, " in DB"),
    status
  };
};
const resolvers = {
  Query: {
    getUsers: (_, arg, context) => (0, _crud.readFile)(KEY_DB)
  },
  Mutation: {
    signup: async (_, arg, context) => {
      const {
        username,
        password,
        email,
        avatar
      } = arg;
      const newUser = {
        username,
        password: await (0, _helpers.cryptoPassword)(password),
        email
      };
      if (avatar) {
        newUser.avatar = avatar;
      }
      const messageStatus = (0, _crud.writeFile)("db.json", newUser, KEY_DB);
      const token = _jsonwebtoken.default.sign({
        userId: newUser.id
      }, APP_SECRET);
      return _objectSpread(_objectSpread({}, messageStatus), {}, {
        token
      });
    },
    login: async (_, arg, context) => {
      const foundUser = (0, _crud.readFile)(KEY_DB).find(user => user.email === arg.email);
      if (!foundUser) return statusCompilation('Don`t found user');
      const validPassword = await _bcrypt.default.compare(arg.password, foundUser.password);
      if (!validPassword) return statusCompilation('Password is invalid ');
      const token = _jsonwebtoken.default.sign({
        userId: foundUser.id
      }, APP_SECRET);
      const StatusMessage = statusCompilation('Successful connection', true);
      return _objectSpread(_objectSpread({}, StatusMessage), {}, {
        token,
        user: foundUser
      });
    },
    removeUser: (_, arg, context) => {
      const {
        id
      } = arg;
      return (0, _crud.updateFile)(KEY_DB, 'delete', parseInt(id), KEY_DB);
    },
    changeUser: async (_, _ref, context) => {
      let {
          id
        } = _ref,
        arg = _objectWithoutProperties(_ref, _excluded);
      const {
        password
      } = arg;
      if (password) {
        arg.password = await (0, _helpers.cryptoPassword)(password);
      }
      return (0, _crud.updateFile)(KEY_DB, 'put', parseInt(id), arg);
    }
  }
};
var _default = resolvers;
exports.default = _default;