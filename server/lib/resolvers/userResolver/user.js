"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.parse-int.js");
var _crud = require("../crud");
var _helpers = require("../../helpers");
const _excluded = ["id"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var _default = {
  query: {
    getUsers: () => (0, _crud.readFile)('users')
  },
  mutation: {
    addUser: async (_, arg) => {
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
      return (0, _crud.writeFile)("db.json", newUser, "users");
    },
    removeUser: (_, arg) => {
      const {
        id
      } = arg;
      return (0, _crud.updateFile)('users', 'delete', parseInt(id), 'users');
    },
    changeUser: async (_, _ref) => {
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
      return (0, _crud.updateFile)('users', 'put', parseInt(id), arg);
    }
  }
};
exports.default = _default;