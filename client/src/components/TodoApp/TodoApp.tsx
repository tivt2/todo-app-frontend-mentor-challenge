import { FILTER_TYPE, Tuser } from "@/types/types";
import { useQuery } from "react-query";
import { Todo } from "./TodoItem/Todo";
import { Generic } from "../Generic";
import { fetchUser } from "@/api/requests";
import { AuthContext } from "@/contexts/AuthProvider";
import { useContext, useState } from "react";
import { ThemeContext } from "@/contexts/ThemeProvider";
import { TodoItem } from "./TodoItem";
import { TodoFilter } from "./TodoFilter";

export function TodoApp() {
  const { setAuth } = useContext(AuthContext);
  const { windowWidth } = useContext(ThemeContext);
  const [filterType, setFilterType] = useState(FILTER_TYPE.ALL);
  const { data, isLoading } = useQuery<Tuser>(
    "todos",
    fetchUser(() => setAuth(false))
  );

  const filterOrder = (filter: FILTER_TYPE = filterType) => {
    if (!data) {
      return [];
    }
    if (filter === FILTER_TYPE.ALL) {
      return data.todosOrder;
    } else if (filter === FILTER_TYPE.ACTIVE) {
      const neworder = data.todosOrder.filter(
        (todoid: string) => !data.todos[todoid].complete
      );
      return neworder;
    } else {
      const neworder = data.todosOrder.filter(
        (todoid: string) => data.todos[todoid].complete
      );
      return neworder;
    }
  };

  const filteredorder = filterOrder();

  return (
    <div className="w-full flex flex-col items-center gap-4 brkpt:gap-[1.35rem]">
      {/* NEW TODO */}
      <Generic.Container>
        <Todo isNewTodo={true} />
      </Generic.Container>

      {/* TODO LIST */}
      <Generic.Container>
        {!isLoading && !!data
          ? filteredorder.map((todoId: string) => {
              return (
                <Todo
                  key={todoId}
                  content={data.todos[todoId].content}
                  complete={data.todos[todoId].complete}
                />
              );
            })
          : null}
        <TodoItem.Root className=" flex flex-row items-center justify-between p-4 cursor-pointer gap-3 brkpt:gap-4 text-xs brkpt:text-sm text-light-base-400 dark:text-dark-base-300 font-bold">
          <span className="mt-1">
            {filterOrder(FILTER_TYPE.ACTIVE).length} items left
          </span>
          {windowWidth > 576 ? (
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
              // fetchDeleteTodos
            }}
          />
        </TodoItem.Root>
      </Generic.Container>

      {/* TODO FILTER WHEN MOBILE */}
      {windowWidth < 576 ? (
        <Generic.Container className="justify-center">
          <TodoItem.Root className="flex flex-row items-center justify-center gap-4 p-4 text-xs font-bold text-light-base-400 dark:text-dark-base-200">
            <TodoFilter filterType={filterType} setFilterType={setFilterType} />
          </TodoItem.Root>
        </Generic.Container>
      ) : null}
    </div>
  );
}
