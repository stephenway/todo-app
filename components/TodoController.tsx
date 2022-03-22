import { useTodos } from "../containers/TodoListProvider";
import { type Todo } from "../interfaces";
import { HTMLProps } from "../interfaces/primitive";
import styles from "../styles/TodoController.module.css";
import Button from "./Button";
import TodoFilterGroup from "./TodoFilterGroup";
import useWindowWidth from "./utils/useWindowWidth";

interface TodoControllerProps extends HTMLProps<HTMLLIElement> {
  className?: string;
}

const TodoController = ({
  className,
  ...props
}: TodoControllerProps): JSX.Element => {
  const windowWidth = useWindowWidth;
  const { todos, clearCompleted } = useTodos();
  const numActive = todos ? todos.filter((t: Todo) => !t.complete).length : 0;
  const isMobile = windowWidth() < 768;

  return (
    <>
      <li className={`${styles.root} ${className || ""}`} {...props}>
        <span>{numActive} items left</span>
        {!isMobile && <TodoFilterGroup className={styles.filterGroup} />}
        <Button className={styles.completedButton} onClick={clearCompleted}>
          Clear Completed
        </Button>
      </li>
      {isMobile && (
        <li className={`${styles.root} ${styles.leader}`}>
          <TodoFilterGroup />
        </li>
      )}
    </>
  );
};

export default TodoController;
