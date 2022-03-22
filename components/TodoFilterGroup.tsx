import { memo } from "react";
import { useTodos } from "../containers/TodoListProvider";
import { HTMLProps } from "../interfaces/primitive";
import Button from "./Button";

interface TodoFilterGroupProps extends HTMLProps<HTMLSpanElement> {
  filters?: Record<string, any>[];
}

const defaultFilters = [
  { label: "All", key: "all" },
  { label: "Active", key: "active" },
  { label: "Completed", key: "complete" },
];

const TodoFilterGroup = ({
  filters = defaultFilters,
  ...props
}: TodoFilterGroupProps): JSX.Element => {
  const { filterTodos, setFilterTodos } = useTodos();
  return (
    <span {...props}>
      {filters.map(({ label, key }) => {
        const isActive = filterTodos === key;
        return (
          <Button
            key={key}
            onClick={() => setFilterTodos(key)}
            active={isActive}
          >
            {label}
          </Button>
        );
      })}
    </span>
  );
};

export default memo(TodoFilterGroup);
