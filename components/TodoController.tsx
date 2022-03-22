import { useTodos } from "../containers/TodoListProvider";
import { type Todo } from "../interfaces";
import { HTMLProps } from "../interfaces/primitive";
import styles from "../styles/TodoController.module.css";
import Button from "./Button";
import TodoFilterGroup from "./TodoFilterGroup";

interface TodoControllerProps extends HTMLProps<HTMLLIElement> {
  className?: string;
}

const TodoController = ({
  className,
  ...props
}: TodoControllerProps): JSX.Element => {
  const { todos, clearCompleted } = useTodos();
  const numActive = todos ? todos.filter((t: Todo) => !t.complete).length : 0;

  return (
    <>
      <li className={`${styles.root} ${className || ""}`} {...props}>
        <span>{numActive} items left</span>
        <TodoFilterGroup
          className={`${styles.filterGroup} ${styles.hideMobile}`}
        />
        <Button className={styles.completedButton} onClick={clearCompleted}>
          Clear Completed
        </Button>
      </li>
      <li className={`${styles.root} ${styles.leader} ${styles.hideDesktop}`}>
        <TodoFilterGroup />
      </li>
    </>
  );
};

export default TodoController;
