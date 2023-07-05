"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.uuid)("id").primaryKey(),
    username: (0, pg_core_1.varchar)("username").notNull(),
    password: (0, pg_core_1.varchar)("password").notNull(),
    todos: (0, pg_core_1.json)("todos").notNull().$type(),
    todosOrder: (0, pg_core_1.uuid)("todosOrder").array().notNull(),
});
//# sourceMappingURL=schema.js.map