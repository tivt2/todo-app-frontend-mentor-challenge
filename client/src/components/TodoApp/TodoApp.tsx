import { addTokenToRequest, api } from "@/api/axios";
import { Tuser } from "@/types/types";
import { useQuery } from "react-query";
import { Todo } from "./TodoItem/Todo";
import { Generic } from "../Generic";

const fetchUser = () => {
  addTokenToRequest();
  const res = api
    .get("/todos")
    .then((data) => {
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
      <Generic.Container>
        {!isLoading && !!data
          ? data.todosOrder.map((todoId: string) => {
              return (
                <Todo
                  key={todoId}
                  content={data.todos[todoId].content}
                  complete={data.todos[todoId].complete}
                  onEdit={() => {}}
                  onSubmit={() => {}}
                />
              );
            })
          : null}
      </Generic.Container>
    </>
  );
}
