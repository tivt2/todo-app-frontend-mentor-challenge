import { useDeleteTodoApi } from "@/api/hooks/useDeleteTodoApi";
import { Generic } from "../Generic";
import { TodoFilter } from "./TodoFilter";
import { TodoItem } from "./TodoItem";
import { useTodoApi } from "@/api/hooks/useTodoApi";
import { FILTER_TYPE } from "@/types/types";
import { filterOrder } from "@/utils/utils";
import { Dispatch, SetStateAction, useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import { ThemeContext } from "@/contexts/ThemeProvider";
import { Todo } from "./TodoItem/Todo";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
  OnDragEndResponder,
  ResponderProvided,
} from "react-beautiful-dnd";
import { useUpdateTodosOrderApi } from "@/api/hooks/useUpdateTodosOrderApi";
import { useQueryClient } from "react-query";

interface TodoListProps {
  filterType: FILTER_TYPE;
  setFilterType: Dispatch<SetStateAction<FILTER_TYPE>>;
}

export function TodoList({ filterType, setFilterType }: TodoListProps) {
  const { setAuth } = useContext(AuthContext);
  const { brkpt } = useContext(ThemeContext);
  const { deleteTodos } = useDeleteTodoApi();
  const { updateTodosOrder } = useUpdateTodosOrderApi();
  const { data: user, isLoading } = useTodoApi({
    onSuccess: (data) => {
      return data;
    },
    onError: (_err) => {
      const queryClient = useQueryClient();
      localStorage.removeItem("token");
      queryClient.removeQueries("todos");
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

  const handleDragEnd = (results: DropResult) => {
    const { source, destination } = results;
    if (!user || !destination || destination.index === source.index) {
      return;
    }

    const todosOrder = user.todosOrder.slice();
    const item = todosOrder.splice(source.index, 1)[0];
    todosOrder.splice(destination.index, 0, item);
    updateTodosOrder(todosOrder);
  };

  return (
    <Generic.Container>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="ROOT">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {!isLoading
                ? filteredorder.map((todoId: string, idx: number) => (
                    <Draggable draggableId={todoId} index={idx} key={todoId}>
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          className={` rounded-t-md bg-light-base-100 dark:bg-dark-base-500`}
                        >
                          <Todo
                            listIdx={idx}
                            todoId={todoId}
                            content={user?.todos[todoId].content}
                            complete={user?.todos[todoId].complete}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                : null}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <TodoItem.Root className=" flex flex-row items-center justify-between p-4 cursor-pointer gap-3 brkpt:gap-4 text-xs brkpt:text-sm text-light-base-400 dark:text-dark-base-300 font-bold">
        <span className="mt-1">{activeTodos.length} items left</span>
        {!brkpt ? (
          <TodoItem.Root className="pl-[7ex] flex flex-row items-center justify-center gap-4 text-sm font-bold text-light-base-400 dark:text-dark-base-200">
            <TodoFilter filterType={filterType} setFilterType={setFilterType} />
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
  );
}
