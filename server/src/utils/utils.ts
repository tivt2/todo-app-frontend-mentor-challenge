import { v4 as uuidv4 } from "uuid";
import { TtodoItem, Tuser } from "../types/types";

const newTodoUser = (user: Tuser, content: string, complete: boolean) => {
  const buildTodoItem = (content: string, complete: boolean): TtodoItem => {
    return {
      id: uuidv4(),
      content,
      complete,
    };
  };

  const newTodo = buildTodoItem(content, complete);

  user.todos[newTodo.id] = newTodo;
  user.todosOrder.push(newTodo.id);
  return user;
};

const editTodoItem = (
  user: Tuser,
  todoId: string,
  content: string,
  complete: boolean
) => {
  user.todos[todoId] = { id: todoId, content, complete };
  return user;
};

const deleteTodoItem = (user: Tuser, todoIds: string[]) => {
  const oldOrder = user.todosOrder;
  user.todosOrder = oldOrder.filter((id) => !todoIds.includes(id));
  todoIds.forEach((id) => delete user.todos[id]);
  return user;
};

export { newTodoUser, editTodoItem, deleteTodoItem };
