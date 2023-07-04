import { FILTER_TYPE, TnewTodo, TtodoItem, Tuser } from "@/types/types";
import { v4 as uuidv4 } from "uuid";

export const filterTodosFromUser = (user: Tuser, todoIds: string[]): Tuser => {
  const newOrder = user.todosOrder.filter(
    (todoId) => !todoIds.includes(todoId)
  );

  const todoEntries = Object.entries(user.todos);
  const filterTodos = todoEntries.filter(([key]) => newOrder.includes(key));
  const newTodos = Object.fromEntries(filterTodos);

  return {
    ...user,
    todos: newTodos,
    todosOrder: newOrder,
  };
};

export const filterOrder = (filter: FILTER_TYPE, user: Tuser | undefined) => {
  if (!user || !user.todosOrder) {
    return [];
  }
  if (filter === FILTER_TYPE.ALL) {
    return user.todosOrder;
  } else {
    const newOrder = user.todosOrder.filter((todoId: string) => {
      if (filter === FILTER_TYPE.ACTIVE) {
        return !user.todos[todoId].complete;
      } else {
        return user.todos[todoId].complete;
      }
    });
    return newOrder;
  }
};

export const genMockNewTodo = (newTodo: TnewTodo, user: Tuser) => {
  const mockId = uuidv4();
  const userCopy = structuredClone(user);
  userCopy.todos[mockId] = {
    id: mockId,
    content: newTodo.content,
    complete: newTodo.complete,
  };
  userCopy.todosOrder.push(mockId);
  return userCopy;
};

export const editTodoInUser = (editTodo: TtodoItem, user: Tuser) => {
  const userCopy = structuredClone(user);
  userCopy.todos[editTodo.id] = editTodo;
  return userCopy;
};
