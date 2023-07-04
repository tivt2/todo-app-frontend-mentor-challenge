import { TnewTodo, Tuser } from "@/types/types";
import { useMutation, useQueryClient } from "react-query";
import { api } from "../axios";
import { genMockNewTodo } from "@/utils/utils";

const createTodoRequest = async (newTodo: TnewTodo): Promise<Tuser> => {
  try {
    const res = await api.post("/todos", { data: newTodo });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export function useCreateTodoApi() {
  const queryClient = useQueryClient();
  const { mutate: createTodo } = useMutation<
    Tuser,
    unknown,
    TnewTodo,
    { oldUser?: Tuser }
  >(createTodoRequest, {
    onMutate: async (newTodo) => {
      queryClient.cancelQueries("todos");
      const oldUser = queryClient.getQueryData<Tuser>("todos");
      const newUser = genMockNewTodo(newTodo, oldUser as Tuser);
      queryClient.setQueryData<Tuser>("todos", newUser);
      return { oldUser };
    },
    onSuccess: (data) => {
      queryClient.setQueryData("todos", data);
    },
    onError: (_error, _newTodo, context) => {
      queryClient.setQueryData("todos", context?.oldUser);
    },
  });

  return { createTodo };
}
