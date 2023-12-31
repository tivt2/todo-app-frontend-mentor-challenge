import { useMutation, useQueryClient } from "react-query";
import { api } from "../axios";
import { Tuser } from "@/types/types";
import { filterTodosFromUser } from "@/utils/utils";

const deleteTodoRequest = async (todoIds: string[]): Promise<Tuser> => {
  try {
    const res = await api.delete("/todos", { data: { todoIds } });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export function useDeleteTodoApi() {
  const queryClient = useQueryClient();
  const { mutate: deleteTodos } = useMutation<
    Tuser,
    unknown,
    string[],
    { oldUser?: Tuser }
  >(deleteTodoRequest, {
    onMutate: async (todoIds) => {
      queryClient.cancelQueries("todos");
      const oldUser = queryClient.getQueryData<Tuser>("todos");
      const newUser = filterTodosFromUser(oldUser as Tuser, todoIds);
      queryClient.setQueryData<Tuser>("todos", newUser);
      return { oldUser };
    },
    onSuccess: (data) => {
      queryClient.setQueryData("todos", data);
    },
    onError: (_error, _todoIds, context) => {
      queryClient.setQueryData("todos", context?.oldUser);
    },
  });

  return { deleteTodos };
}
