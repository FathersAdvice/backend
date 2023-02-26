"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n    type Query {\n        getUsers: [User]\n    }\n    type Mutation { \n        addUser(username: String!, email: String!, password: String!, avatar: String): MessageStatus!\n    }\n    type User {\n        username: String!\n        password: String!\n        email: String!\n        avatar: String\n    }\n    type MessageStatus {\n       status: Boolean!\n       msg: String!\n    }\n";
exports.default = _default;