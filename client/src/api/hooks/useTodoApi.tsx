import { addTokenToRequest, api } from "@/api/axios";
import { Tuser } from "@/types/types";
import { useQuery } from "react-query";

const readUserRequest = async (): Promise<Tuser> => {
  addTokenToRequest();
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
    onSuccess,
    onError,
  });
}
