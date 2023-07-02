import { Tuser } from "../types/types";

export const buildUser = (() => {
  let id = 1;

  return (username: string, password: string): Tuser => {
    id++;
    return {
      id: id.toString(),
      username,
      password,
      todos: {},
      todosOrder: [],
    };
  };
})();
