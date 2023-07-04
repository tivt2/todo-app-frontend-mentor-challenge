import { FILTER_TYPE } from "@/types/types";
import { Generic } from "../Generic";
import { useContext, useState } from "react";
import { ThemeContext } from "@/contexts/ThemeProvider";
import { TodoItem } from "./TodoItem";
import { TodoFilter } from "./TodoFilter";
import { NewTodo } from "./NewTodo";
import { TodoList } from "./TodoList";

export function TodoApp() {
  const { brkpt } = useContext(ThemeContext);
  const [filterType, setFilterType] = useState(FILTER_TYPE.ALL);

  return (
    <div className="w-full flex flex-col items-center gap-4 brkpt:gap-[1.35rem]">
      <NewTodo />
      <TodoList filterType={filterType} setFilterType={setFilterType} />
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
