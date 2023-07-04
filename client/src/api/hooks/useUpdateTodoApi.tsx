import { TtodoItem, Tuser } from "@/types/types";
import { useMutation, useQueryClient } from "react-query";
import { api } from "../axios";
import { editTodoInUser } from "@/utils/utils";

const updateTodoRequest = async (editTodo: TtodoItem) => {
  try {
    const res = await api.put(`/todos`, { data: editTodo });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export function useUpdateTodoApi() {
  const queryClient = useQueryClient();
  const { mutate: updateTodo } = useMutation<
    Tuser,
    unknown,
    TtodoItem,
    { oldUser?: Tuser }
  >(updateTodoRequest, {
    onMutate: (editTodo) => {
      const oldUser = queryClient.getQueryData<Tuser>("todos");
      const newUser = editTodoInUser(editTodo, oldUser as Tuser);
      queryClient.setQueryData("todos", newUser);
      return { oldUser };
    },
    onSuccess: (data) => {
      queryClient.setQueryData("todos", data);
    },
    onError: (_error, _, context) => {
      queryClient.setQueryData("todos", context?.oldUser);
    },
  });

  return { updateTodo };
}
