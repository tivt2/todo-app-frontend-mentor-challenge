"use client";

import { useContext, useRef, useState } from "react";
import { TodoItem } from ".";
import { Generic } from "@/components/Generic";
import { Icon } from "@/components/Icons";
import { ThemeContext } from "@/contexts/ThemeProvider";
import { useDeleteTodoApi } from "@/api/hooks/useDeleteTodoApi";
import { useCreateTodoApi } from "@/api/hooks/useCreateTodoApi";
import { useUpdateTodoApi } from "@/api/hooks/useUpdateTodoApi";

interface TodoProps {
  todoId?: string;
  content?: string;
  complete?: boolean;
  isNewTodo?: boolean;
}

export function Todo({
  todoId,
  content,
  complete,
  isNewTodo = false,
}: TodoProps) {
  const [todoContent, setTodoContent] = useState(
    isNewTodo ? "" : content ?? ""
  );
  const [todoComplete, setTodoComplete] = useState(
    isNewTodo ? false : complete ?? false
  );
  const { brkpt } = useContext(ThemeContext);
  const [isHover, setIsHover] = useState(false);
  const [isEditing, setIsEditing] = useState(isNewTodo ? true : false);
  const contentBeforeEditing = useRef(todoContent);

  const { createTodo } = useCreateTodoApi();
  const { updateTodo } = useUpdateTodoApi();
  const { deleteTodos } = useDeleteTodoApi();

  const handleOnCtrlEnter = () => {
    if (isNewTodo) {
      createTodo({ content: todoContent, complete: todoComplete });
      setTodoContent("");
      setTodoComplete(false);
    } else if (contentBeforeEditing.current !== todoContent) {
      updateTodo({
        id: todoId as string,
        content: todoContent,
        complete: todoComplete,
      });
      setIsEditing(false);
    }
  };

  const handleOnBlur = () => {
    if (!isNewTodo && contentBeforeEditing.current !== todoContent) {
      updateTodo({
        id: todoId as string,
        content: todoContent,
        complete: todoComplete,
      });
    }
    setIsEditing(false);
  };

  return (
    <TodoItem.Root
      className={` flex flex-row items-center justify-between p-4 cursor-pointer gap-3 brkpt:gap-4 ${
        !isNewTodo
          ? "border-b border-b-light-base-200 dark:border-b-dark-base-400"
          : ""
      }`}
      onClick={() => {
        contentBeforeEditing.current = todoContent;
        setIsEditing(true);
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <TodoItem.Check
        complete={todoComplete}
        onClick={() => {
          if (!isNewTodo) {
            updateTodo({
              id: todoId as string,
              content: todoContent,
              complete: !todoComplete,
            });
          }
          setTodoComplete((curr) => !curr);
        }}
      />
      <TodoItem.TextArea
        newTodo={isNewTodo}
        isEditing={isEditing}
        content={todoContent}
        complete={todoComplete}
        onClick={() => {
          contentBeforeEditing.current = todoContent;
          setIsEditing(true);
        }}
        onCtrlEnter={() => handleOnCtrlEnter()}
        onBlur={() => handleOnBlur()}
        onChange={setTodoContent}
      />
      {isNewTodo ? (
        <Generic.Button
          text="Ctrl+Enter"
          className="text-xs leading-none whitespace-nowrap font-bold text-light-base-300 dark:text-dark-base-400"
          onClick={() => {
            createTodo({ content: todoContent, complete: todoComplete });
            setTodoContent("");
            setTodoComplete(false);
          }}
        />
      ) : brkpt || isHover ? (
        <Generic.Button
          icon={Icon.X}
          className="h-full min-w-[20px] scale-75 cursor-pointer brkpt:scale-90"
          onClick={() => {
            deleteTodos([todoId as string]);
          }}
        />
      ) : null}
    </TodoItem.Root>
  );
}
