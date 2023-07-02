"use client";

import { ForwardedRef, useCallback, useEffect, useRef } from "react";

interface TodoItemTextAreaProps {
  complete: boolean;
  content: string;
  onChange: (newContent: string) => void;
  onCtrlEnter: () => void;
  isEditing: boolean;
  newTodo?: boolean;
  onBlur?: () => void;
}

export const TodoItemTextArea = ({
  complete,
  content,
  onChange,
  onCtrlEnter,
  isEditing,
  newTodo = false,
  onBlur = () => {},
}: TodoItemTextAreaProps) => {
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const handleResize = useCallback(() => {
    if (textRef.current) {
      textRef.current.style.height = "auto";
      textRef.current.style.height = textRef.current.scrollHeight + "px";
    }
  }, [textRef]);

  useEffect(() => {
    handleResize();
    if (textRef.current) {
      textRef.current.setSelectionRange(
        textRef.current.value.length,
        textRef.current.value.length
      );
      textRef.current.focus();
    }
  }, [textRef, handleResize, isEditing]);

  const handleKeyDown = (isCtrl: boolean, key: string) => {
    if (isCtrl && key === "Enter") {
      onCtrlEnter();
    }
  };

  return (
    <textarea
      disabled={!isEditing}
      className={`w-full block text-xs brkpt:text-base bg-transparent leading-tight cursor-pointer placeholder:text-light-base-400 dark:placeholder:text-dark-base-200 caret-primaryBlue outline-none resize-none ${
        complete && !newTodo
          ? " line-through text-light-base-300 dark:text-dark-base-300"
          : "text-light-base-500 dar:text-dark-base-100"
      }`}
      onChange={(e) => {
        handleResize();
        onChange(e.target.value);
      }}
      onKeyDown={(e) => handleKeyDown(e.ctrlKey, e.key)}
      onBlur={() => onBlur()}
      rows={1}
      maxLength={200}
      placeholder={newTodo ? "Create a new todo..." : ""}
      value={content}
      ref={textRef}
    ></textarea>
  );
};
