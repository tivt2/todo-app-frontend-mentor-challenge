import { Tuser } from "../types/types";
import { v4 as uuidv4 } from "uuid";

export const buildUser = (username: string, password: string): Tuser => {
  return {
    id: uuidv4(),
    username,
    password,
    todos: {},
    todosOrder: [],
  };
};
