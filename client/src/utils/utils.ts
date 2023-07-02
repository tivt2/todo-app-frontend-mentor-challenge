import { FILTER_TYPE, Tuser } from "@/types/types";

export const filterTodosFromUser = (user: Tuser, todoIds: string[]): Tuser => {
  const newOrder = user.todosOrder.filter(
    (todoId) => !todoIds.includes(todoId)
  );
  console.log(newOrder);

  const todoEntries = Object.entries(user.todos);
  const filterTodos = todoEntries.filter(([key]) => newOrder.includes(key));
  const newTodos = Object.fromEntries(filterTodos);
  console.log(newTodos);

  return {
    ...user,
    todos: newTodos,
    todosOrder: newOrder,
  };
};
export const filterOrder = (filter: FILTER_TYPE, user: Tuser) => {
  if (!user) {
    return [];
  }
  if (filter === FILTER_TYPE.ALL) {
    return user.todosOrder;
  } else if (filter === FILTER_TYPE.ACTIVE) {
    const neworder = user.todosOrder.filter(
      (todoid: string) => !user.todos[todoid].complete
    );
    return neworder;
  } else {
    const neworder = user.todosOrder.filter(
      (todoid: string) => user.todos[todoid].complete
    );
    return neworder;
  }
};
