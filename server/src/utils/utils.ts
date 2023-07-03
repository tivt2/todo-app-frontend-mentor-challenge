import { v4 as uuidv4 } from "uuid";
import { Tdb, TtodoItem, Tuser } from "../types/types";

const newTodoItem = (
  db: Tdb,
  user: Tuser,
  content: string,
  complete: boolean
) => {
  const buildTodoItem = (content: string, complete: boolean): TtodoItem => {
    return {
      id: uuidv4(),
      content,
      complete,
    };
  };

  const newTodo = buildTodoItem(content, complete);

  db[user.id].todos[newTodo.id] = newTodo;
  db[user.id].todosOrder.push(newTodo.id);
};

const editTodoItem = (
  db: Tdb,
  user: Tuser,
  todoId: string,
  content: string,
  complete: boolean
): void => {
  db[user.id].todos[todoId] = { id: todoId, content, complete };
};

const deleteTodoItem = (db: Tdb, user: Tuser, todoIds: string[]): void => {
  const oldOrder = db[user.id].todosOrder;
  db[user.id].todosOrder = oldOrder.filter((id) => !todoIds.includes(id));
  todoIds.forEach((id) => delete db[user.id].todos[id]);
};

export { newTodoItem, editTodoItem, deleteTodoItem };
