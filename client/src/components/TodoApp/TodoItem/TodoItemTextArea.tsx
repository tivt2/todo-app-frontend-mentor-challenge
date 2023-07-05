"use client";

import { ThemeContext } from "@/contexts/ThemeProvider";
import { useCallback, useContext, useEffect, useRef } from "react";

interface TodoItemTextAreaProps {
  complete: boolean;
  content: string;
  onClick: () => void;
  onChange: (newContent: string) => void;
  onCtrlEnter: () => void;
  isEditing: boolean;
  newTodo?: boolean;
  onBlur?: () => void;
}

export const TodoItemTextArea = ({
  complete,
  content,
  onClick,
  onChange,
  onCtrlEnter,
  isEditing,
  newTodo = false,
  onBlur = () => {},
}: TodoItemTextAreaProps) => {
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const { brkpt } = useContext(ThemeContext);

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

  useEffect(() => {
    handleResize();
  }, [brkpt, handleResize]);

  const handleKeyDown = (isCtrl: boolean, key: string) => {
    if (isCtrl && key === "Enter") {
      onCtrlEnter();
    }
  };

  return (
    <textarea
      className={`mt-1 w-full block text-xs brkpt:text-base bg-transparent leading-tight cursor-pointer placeholder:text-light-base-400 dark:placeholder:text-dark-base-200 caret-primaryBlue outline-none resize-none ${
        complete && !newTodo && !isEditing
          ? " line-through text-light-base-300 dark:text-dark-base-300"
          : "text-light-base-500 dark:text-dark-base-100"
      } ${!isEditing ? " pointer-events-none" : ""}`}
      onClick={() => onClick()}
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
