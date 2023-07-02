import { addTokenToRequest, api } from "@/api/axios";
import { Tuser } from "@/types/types";
import { useQuery } from "react-query";

const fetchUser = () => {
  addTokenToRequest();
  const res = api
    .get("/todos")
    .then((data) => {
      console.log(data.data);
      return data.data;
    })
    .catch((err) => console.log(err.response.data.message));

  return res;
};

interface TodoAppProps {}

export function TodoApp(props: TodoAppProps) {
  const { data, isLoading } = useQuery<Tuser>("todos", fetchUser);

  return (
    <>
      {!isLoading &&
        !!data &&
        data.todosOrder.map((todoId: string) => {
          return <p key={todoId}>{data.todos[todoId].content}</p>;
        })}
    </>
  );
}
