"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
var _fs = _interopRequireDefault(require("fs"));
var _helpers = require("./helpers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const readUser = () => {
  const data = _fs.default.readFileSync((0, _helpers.getFilename)("db.json"), "utf-8");
  return JSON.parse(data);
};
const writeFile = (filename, data, key) => {
  let status;
  const prevData = readUser();
  if (prevData[key]) {
    const onCopyStatus = (0, _helpers.checkUniqElements)(prevData[key], data);
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
const resolvers = {
  Query: {
    getUsers: () => readUser().users
  },
  Mutation: {
    addUser: async (_, arg) => {
      const {
        username,
        password,
        email,
        avatar
      } = arg;
      const newUser = {
        username,
        password: (0, _helpers.cryptoPassword)(password),
        email
      };
      if (avatar) {
        newUser.avatar = avatar;
      }
      return writeFile("db.json", newUser, "users");
    }
  }
};
var _default = resolvers;
exports.default = _default;