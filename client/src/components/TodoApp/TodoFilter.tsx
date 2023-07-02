import { FILTER_TYPE } from "@/types/types";
import { TodoItem } from "./TodoItem";
import { Generic } from "../Generic";

interface TodoFilterProps {
  filterType: FILTER_TYPE;
  setFilterType: (newFilter: FILTER_TYPE) => void;
}

export function TodoFilter({ filterType, setFilterType }: TodoFilterProps) {
  return (
    <>
      <Generic.Button
        text="All"
        className={`mt-1 transition-all duration-200 ${
          filterType === FILTER_TYPE.ALL && "text-primaryBlue"
        } hover:text-light-base-500 dark:hover:text-dark-base-100`}
        onClick={() => setFilterType(FILTER_TYPE.ALL)}
      />
      <Generic.Button
        text="Active"
        className={`mt-1 transition-all duration-200 ${
          filterType === FILTER_TYPE.ACTIVE && "text-primaryBlue"
        } hover:text-light-base-500 dark:hover:text-dark-base-100`}
        onClick={() => setFilterType(FILTER_TYPE.ACTIVE)}
      />
      <Generic.Button
        text="Completed"
        className={`mt-1 transition-all duration-200 ${
          filterType === FILTER_TYPE.COMPLETED && "text-primaryBlue"
        } hover:text-light-base-500 dark:hover:text-dark-base-100`}
        onClick={() => setFilterType(FILTER_TYPE.COMPLETED)}
      />
    </>
  );
}
