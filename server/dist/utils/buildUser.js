"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildUser = void 0;
const uuid_1 = require("uuid");
const buildUser = (username, password) => {
    return {
        id: (0, uuid_1.v4)(),
        username,
        password,
        todos: {},
        todosOrder: [],
    };
};
exports.buildUser = buildUser;
//# sourceMappingURL=buildUser.js.map