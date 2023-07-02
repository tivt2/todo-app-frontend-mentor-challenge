import { Tdb, Tuser } from "../types/types";

const deleteTodoItem = (db: Tdb, user: Tuser, todoIds: string[]): void => {
  const oldOrder = db[user.id].todosOrder;
  db[user.id].todosOrder = oldOrder.filter((id) => !todoIds.includes(id));
  todoIds.forEach((id) => delete db[user.id].todos[id]);
};

export { deleteTodoItem };
