import { useContext, useState } from "react";
import { TodoItem } from ".";
import { Generic } from "@/components/Generic";
import { Icon } from "@/components/Icons";
import { ThemeContext } from "@/contexts/ThemeProvider";

interface TodoProps {
  content?: string;
  complete?: boolean;
  isNewTodo?: boolean;
}

export function Todo({ content, complete, isNewTodo = false }: TodoProps) {
  const [todoContent, setTodoContent] = useState(
    isNewTodo ? "" : content ?? ""
  );
  const [todoComplete, setTodoComplete] = useState(
    isNewTodo ? false : complete ?? false
  );
  const [isEditing, setIsEditing] = useState(isNewTodo ? true : false);
  const [isHover, setIsHover] = useState(false);
  const { brkpt } = useContext(ThemeContext);

  const handleOnCtrlEnter = () => {
    if (isNewTodo) {
      // fetchNewTodo
      setTodoContent("");
      setTodoComplete(false);
    } else {
      // fetchEditTodo
    }
  };

  const handleOnBlur = () => {
    if (!isNewTodo) {
      // fetchEditTodo
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
      onClick={() => setIsEditing(true)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <TodoItem.Check
        complete={todoComplete}
        onClick={() => {
          setTodoComplete((curr) => !curr);
        }}
      />
      <TodoItem.TextArea
        newTodo={isNewTodo}
        isEditing={isEditing}
        content={todoContent}
        complete={todoComplete}
        onClick={() => setIsEditing(true)}
        onCtrlEnter={() => handleOnCtrlEnter()}
        onBlur={() => handleOnBlur()}
        onChange={setTodoContent}
      />
      {isNewTodo ? (
        <Generic.Button
          text="Ctrl+Enter"
          className="text-xs leading-none whitespace-nowrap font-bold text-light-base-300 dark:text-dark-base-400"
          onClick={() => {
            // fetchNewTodo
            setTodoContent("");
            setTodoComplete(false);
          }}
        />
      ) : brkpt || isHover ? (
        <Generic.Button
          icon={Icon.X}
          className="h-full min-w-[20px] scale-75 cursor-pointer brkpt:scale-90"
          onClick={() => {
            // fetchDeleteTdodos
          }}
        />
      ) : null}
    </TodoItem.Root>
  );
}
