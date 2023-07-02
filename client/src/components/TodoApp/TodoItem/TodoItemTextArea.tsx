"use client";

import { forwardRef } from "react";

interface TodoItemTextAreaProps {
  disabled: boolean;
}

export const TodoItemTextArea = forwardRef(
  ({ disabled }: TodoItemTextAreaProps, ref) => {
    return (
      <textarea
        disabled={disabled}
        className=" w-full block bg-transparent caret-primaryBlue outline-none resize-none p-0 bg-slate-400"
        onChange={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
        rows={1}
        ref={(node) => {
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
      ></textarea>
    );
  }
);
