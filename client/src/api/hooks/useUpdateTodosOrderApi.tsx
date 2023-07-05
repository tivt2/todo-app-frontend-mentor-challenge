import { TtodoItem, Tuser } from "@/types/types";
import { useMutation, useQueryClient } from "react-query";
import { api } from "../axios";
import { editTodosOrder } from "@/utils/utils";

const updateTodosOrderRequest = async (newTodosOrder: string[]) => {
  try {
    const res = await api.put(`/todos/order`, { data: { newTodosOrder } });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export function useUpdateTodosOrderApi() {
  const queryClient = useQueryClient();
  const { mutate: updateTodosOrder } = useMutation<
    Tuser,
    unknown,
    string[],
    { oldUser?: Tuser }
  >(updateTodosOrderRequest, {
    onMutate: async (newTodosOrder) => {
      await queryClient.cancelQueries("todos");
      const oldUser = queryClient.getQueryData<Tuser>("todos");
      const newUser = editTodosOrder(newTodosOrder, oldUser as Tuser);
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

  return { updateTodosOrder };
}
