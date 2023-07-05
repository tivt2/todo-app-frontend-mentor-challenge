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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const buildUser_1 = require("./utils/buildUser");
const genToken_1 = require("./utils/genToken");
const authToken_1 = require("./middleware/authToken");
const utils_1 = require("./utils/utils");
const hashing_1 = require("./utils/hashing");
const spamProtect_1 = require("./middleware/spamProtect");
const queries_1 = require("./db/queries");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(spamProtect_1.spamProtect);
app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});
// REGISTER ROUTE
app.post("/api/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("new register request");
    const { username, password } = req.body;
    const user = yield (0, queries_1.selectUserByUsername)(username);
    if (user) {
        console.log("user creation failed username already exist");
        return res.status(400).json({ message: "User name already exist" });
    }
    console.log("building new user");
    const hashedPassword = yield (0, hashing_1.hashPassword)(password);
    const newUser = (0, buildUser_1.buildUser)(username, hashedPassword);
    const registredUser = yield (0, queries_1.insertNewUser)(newUser);
    console.log(registredUser);
    res.status(201).json({ message: `Registred user ${username}` });
}));
// LOGIN ROUTE
app.post("/api/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("new login request");
    const { username, password } = req.body;
    const user = yield (0, queries_1.selectUserByUsername)(username);
    if (!user) {
        console.log("user doesnt exist");
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const passwordMatch = yield (0, hashing_1.comparePassword)(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = (0, genToken_1.genToken)(user.id);
    res.status(202).json({ token });
}));
// GET USER ROUTE
app.get("/api/todos", authToken_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("new get user request");
    const { userId } = req.body;
    const user = yield (0, queries_1.selectUserById)(userId);
    if (!user) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    const payload = {
        id: user.id,
        username: user.username,
        todos: user.todos,
        todosOrder: user.todosOrder,
    };
    res.status(200).json(payload);
}));
// CREATE NEW TODO ROUTE
app.post("/api/todos", authToken_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("new create todo request");
    const { userId, data: { content, complete }, } = req.body;
    const user = yield (0, queries_1.selectUserById)(userId);
    if (!user) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    const updatedUser = (0, utils_1.newTodoUser)(user, content, complete);
    const newUser = yield (0, queries_1.updateUser)(updatedUser);
    console.log("created new todo");
    const payload = {
        id: newUser.id,
        username: newUser.username,
        todos: newUser.todos,
        todosOrder: newUser.todosOrder,
    };
    res.status(200).json(payload);
}));
// EDIT TODO ROUTE
app.put("/api/todos", authToken_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("new edit todo request");
    const { userId, data: { id: todoId, content, complete }, } = req.body;
    const user = yield (0, queries_1.selectUserById)(userId);
    if (!user) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    const updatedUser = (0, utils_1.editTodoItem)(user, todoId, content, complete);
    const newUser = yield (0, queries_1.updateUser)(updatedUser);
    console.log("edited todo item");
    const payload = {
        id: newUser.id,
        username: newUser.username,
        todos: newUser.todos,
        todosOrder: newUser.todosOrder,
    };
    res.status(200).json(payload);
}));
// EDIT TODOS ORDER ROUTE
app.put("/api/todos/order", authToken_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("new edittodosOrder request");
    const { userId, data: { newTodosOrder }, } = req.body;
    const user = yield (0, queries_1.selectUserById)(userId);
    if (!user) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    user.todosOrder = newTodosOrder;
    const newUser = yield (0, queries_1.updateUser)(user);
    console.log("edited todosOrder");
    const payload = {
        id: newUser.id,
        username: newUser.username,
        todos: newUser.todos,
        todosOrder: newUser.todosOrder,
    };
    res.status(200).json(payload);
}));
// DELETE TODOS ROUTE
app.delete("/api/todos", authToken_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("new delete todos request");
    const { userId, todoIds } = req.body;
    const user = yield (0, queries_1.selectUserById)(userId);
    if (!user) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    const updatedUser = (0, utils_1.deleteTodoItem)(user, todoIds);
    const newUser = yield (0, queries_1.updateUser)(updatedUser);
    console.log("deleted todo item");
    const payload = {
        id: newUser.id,
        username: newUser.username,
        todos: newUser.todos,
        todosOrder: newUser.todosOrder,
    };
    res.status(200).json(payload);
}));
exports.default = app;
//# sourceMappingURL=index.js.map