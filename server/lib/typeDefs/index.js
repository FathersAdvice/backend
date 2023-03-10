"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n    type Advice {\n       id: ID\n       author: User!\n       title: String!\n       describe: String\n       date_time_creater: String\n       date_time_update: String\n    }\n    type Query {\n        getUsers: [User]\n        getAdvises: [Advice]\n    }\n    type Mutation { \n        mutation getAdvices {\n           addUser(username: String!, email: String!, password: String!, avatar: String): MessageStatus!\n        }\n        removeUser(id: ID!): MessageStatus!\n        changeUser(id: ID!, username: String, email: String, password: String, avatar: String): MessageStatus!\n    }\n    type User {\n        id: ID\n        username: String!\n        password: String!\n        email: String!\n        avatar: String\n    }\n    type MessageStatus {\n       status: Boolean!\n       msg: String!\n       user: User\n    }\n";
exports.default = _default;