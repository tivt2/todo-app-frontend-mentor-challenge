import { TnewTodo, TtodoItem } from "@/types/types";
import { addTokenToRequest, api } from "./axios";

const fetchUser = (onFailure: (err?: any) => void) => async () => {
  addTokenToRequest();
  try {
    const res = await api.get("/todos");
    return res.data;
  } catch (err) {
    onFailure(err);
  }
};

const fetchNewTodo =
  (onFailure: (err?: any) => void) => async (newTodo: TnewTodo) => {
    try {
      const res = await api.post("/todos", { data: newTodo });
      return res.data;
    } catch (err) {
      onFailure(err);
    }
  };

const fetchEditTodo =
  (onFailure: (err?: any) => void) =>
  async ({ id, ...editTodo }: TtodoItem) => {
    try {
      const res = await api.put(`/todos/${id}`, { data: { ...editTodo } });
      return res.data;
    } catch (err) {
      onFailure(err);
    }
  };

const fetchDeleteTodo =
  (onFailure: (err?: any) => void) => async (todoIds: string[]) => {
    try {
      const res = await api.delete("/todos", { data: { todoIds } });
      return res.data;
    } catch (err) {
      onFailure(err);
    }
  };

export { fetchUser, fetchNewTodo, fetchEditTodo, fetchDeleteTodo };
