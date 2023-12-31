interface TodoItemCheckProps {
  complete: boolean;
  onClick: () => void;
}

export function TodoItemCheck({ complete, onClick }: TodoItemCheckProps) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
      className={`relative h-5 brkpt:h-6 aspect-square flex items-center justify-center rounded-full cursor-pointer ${
        complete
          ? "bg-gradient-to-br from-gradientBlue to-gradientPurple"
          : "border border-light-base-300 dark:border-dark-base-400 hover:border-none border-gradient"
      }`}
    >
      {complete ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="9"
          className="brkpt:mt-[2px] brkpt:ml-[1px] brkpt:scale-110"
        >
          <path
            fill="none"
            stroke="#FFF"
            strokeWidth="2"
            d="M1 4.304L3.696 7l6-6"
          />
        </svg>
      ) : null}
    </div>
  );
}
