"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
var _helpers = require("../helpers");
var _crud = require("./crud");
const resolvers = {
  Query: {
    getUsers: () => (0, _crud.readFile)("users")
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
        password: await (0, _helpers.cryptoPassword)(password),
        email
      };
      if (avatar) {
        newUser.avatar = avatar;
      }
      return (0, _crud.writeFile)("db.json", newUser, "users");
    }
  }
};
var _default = resolvers;
exports.default = _default;