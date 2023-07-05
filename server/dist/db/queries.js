"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.insertNewUser = exports.selectUserById = exports.selectUserByUsername = void 0;
const db_1 = __importDefault(require("./db"));
const schema_1 = require("./schema");
const drizzle_orm_1 = require("drizzle-orm");
function selectUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield db_1.default
            .select()
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.username, username));
        return user[0];
    });
}
exports.selectUserByUsername = selectUserByUsername;
function selectUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield db_1.default.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, userId));
        return user[0];
    });
}
exports.selectUserById = selectUserById;
function insertNewUser(newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield db_1.default.insert(schema_1.users).values(newUser).returning();
        return user[0];
    });
}
exports.insertNewUser = insertNewUser;
function updateUser(newTodoUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield db_1.default
            .update(schema_1.users)
            .set(newTodoUser)
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, newTodoUser.id))
            .returning();
        return user[0];
    });
}
exports.updateUser = updateUser;
//# sourceMappingURL=queries.js.map