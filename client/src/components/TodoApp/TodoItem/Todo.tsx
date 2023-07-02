import { useState } from "react";
import { TodoItem } from ".";

interface TodoProps {
  content?: string;
  complete?: boolean;
  isNewTodo?: true | undefined;
  onSubmit: (data: { content: string; complete: boolean }) => void;
  onEdit: (data: { content: string; complete: boolean }) => void;
}

export function Todo({
  content,
  complete,
  isNewTodo = undefined,
  onSubmit,
  onEdit,
}: TodoProps) {
  const [todoContent, setTodoContent] = useState(
    isNewTodo ? "" : content ?? ""
  );
  const [todoComplete, setTodoComplete] = useState(
    isNewTodo ? false : complete ?? false
  );
  const [isEditing, setIsEditing] = useState(isNewTodo ? true : false);

  return (
    <TodoItem.Root
      className=" flex flex-row items-center justify-between p-4 cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      <TodoItem.Check
        complete={todoComplete}
        onClick={() => {
          setTodoComplete((curr) => !curr);
          onEdit({ content: todoContent, complete: todoComplete });
        }}
      />
      <TodoItem.TextArea
        isEditing={isEditing}
        content={todoContent}
        complete={todoComplete}
        onCtrlEnter={() =>
          onSubmit({
            content: todoContent,
            complete: todoComplete,
          })
        }
        onBlur={() => {
          setIsEditing(false);
          onEdit({
            content: todoContent,
            complete: todoComplete,
          });
        }}
        onChange={setTodoContent}
      />
    </TodoItem.Root>
  );
}
