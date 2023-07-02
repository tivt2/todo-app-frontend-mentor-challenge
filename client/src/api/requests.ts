import { TnewTodo, TtodoItem, Tuser } from "@/types/types";
import { addTokenToRequest, api } from "./axios";

const fetchNewTodo = async (newTodo: TnewTodo) => {
  return api.post("/todos", { data: newTodo });
};

const fetchEditTodo = async ({ id, ...editTodo }: TtodoItem) => {
  return api.put(`/todos/${id}`, { data: { ...editTodo } });
};

export { fetchNewTodo, fetchEditTodo };
