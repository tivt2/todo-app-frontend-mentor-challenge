"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoItem = exports.editTodoItem = exports.newTodoUser = void 0;
const uuid_1 = require("uuid");
const newTodoUser = (user, content, complete) => {
    const buildTodoItem = (content, complete) => {
        return {
            id: (0, uuid_1.v4)(),
            content,
            complete,
        };
    };
    const newTodo = buildTodoItem(content, complete);
    user.todos[newTodo.id] = newTodo;
    user.todosOrder.push(newTodo.id);
    return user;
};
exports.newTodoUser = newTodoUser;
const editTodoItem = (user, todoId, content, complete) => {
    user.todos[todoId] = { id: todoId, content, complete };
    return user;
};
exports.editTodoItem = editTodoItem;
const deleteTodoItem = (user, todoIds) => {
    const oldOrder = user.todosOrder;
    user.todosOrder = oldOrder.filter((id) => !todoIds.includes(id));
    todoIds.forEach((id) => delete user.todos[id]);
    return user;
};
exports.deleteTodoItem = deleteTodoItem;
//# sourceMappingURL=utils.js.map