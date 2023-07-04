import { FILTER_TYPE } from "@/types/types";
import { Todo } from "./TodoItem/Todo";
import { Generic } from "../Generic";
import { AuthContext } from "@/contexts/AuthProvider";
import { useContext, useState } from "react";
import { ThemeContext } from "@/contexts/ThemeProvider";
import { TodoItem } from "./TodoItem";
import { TodoFilter } from "./TodoFilter";
import { useTodoApi } from "@/api/hooks/useTodoApi";
import { useDeleteTodoApi } from "@/api/hooks/useDeleteTodoApi";
import { filterOrder } from "@/utils/utils";

export function TodoApp() {
  const { setAuth } = useContext(AuthContext);
  const { brkpt } = useContext(ThemeContext);
  const [filterType, setFilterType] = useState(FILTER_TYPE.ALL);

  const { deleteTodos } = useDeleteTodoApi();
  const { data: user, isLoading } = useTodoApi({
    onSuccess: (data) => {
      return data;
    },
    onError: (_err) => {
      localStorage.removeItem("token");
      setAuth(false);
    },
  });

  const activeTodos = filterOrder(FILTER_TYPE.ACTIVE, user);
  const completedTodos = filterOrder(FILTER_TYPE.COMPLETED, user);

  const filteredorder =
    filterType === FILTER_TYPE.ALL
      ? user?.todosOrder || []
      : filterType === FILTER_TYPE.ACTIVE
      ? activeTodos
      : completedTodos;

  return (
    <div className="w-full flex flex-col items-center gap-4 brkpt:gap-[1.35rem]">
      {/* NEW TODO */}
      <Generic.Container>
        <Todo isNewTodo={true} />
      </Generic.Container>

      {/* TODO LIST */}
      <Generic.Container>
        {!isLoading
          ? filteredorder?.map((todoId: string) => {
              return (
                <Todo
                  key={todoId}
                  todoId={todoId}
                  content={user?.todos[todoId].content}
                  complete={user?.todos[todoId].complete}
                />
              );
            })
          : null}
        <TodoItem.Root className=" flex flex-row items-center justify-between p-4 cursor-pointer gap-3 brkpt:gap-4 text-xs brkpt:text-sm text-light-base-400 dark:text-dark-base-300 font-bold">
          <span className="mt-1">{activeTodos.length} items left</span>
          {!brkpt ? (
            <TodoItem.Root className="pl-[7ex] flex flex-row items-center justify-center gap-4 text-sm font-bold text-light-base-400 dark:text-dark-base-200">
              <TodoFilter
                filterType={filterType}
                setFilterType={setFilterType}
              />
            </TodoItem.Root>
          ) : null}
          <Generic.Button
            text="Clear Completed"
            className="mt-1 transition-all duration-200 hover:text-light-base-500 dark:hover:text-dark-base-100 active:text-primaryBlue dark:active:text-primaryBlue"
            onClick={() => {
              deleteTodos(completedTodos);
            }}
          />
        </TodoItem.Root>
      </Generic.Container>

      {/* TODO FILTER WHEN MOBILE */}
      {brkpt ? (
        <Generic.Container className="justify-center">
          <TodoItem.Root className="flex flex-row items-center justify-center gap-4 p-4 text-xs font-bold text-light-base-400 dark:text-dark-base-200">
            <TodoFilter filterType={filterType} setFilterType={setFilterType} />
          </TodoItem.Root>
        </Generic.Container>
      ) : null}
    </div>
  );
}
