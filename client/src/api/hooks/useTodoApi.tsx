import { addTokenToRequest, api } from "@/api/axios";
import { Tuser } from "@/types/types";
import { useQuery } from "react-query";

const readUserRequest = async (): Promise<Tuser> => {
  addTokenToRequest();
  console.count("trying request");
  try {
    const res = await api.get("/todos");
    return res.data;
  } catch (err) {
    throw err;
  }
};

export function useTodoApi({
  onSuccess,
  onError,
}: {
  onSuccess: (data: Tuser) => void;
  onError: (err: unknown) => void;
}) {
  return useQuery<Tuser>("todos", readUserRequest, {
    onSuccess, // dealing with success on the TodoApp component
    onError, // dealing with error on the TodoApp component
    retry: 1,
    staleTime: 1000 * 60, // 60 seconds
  });
}
