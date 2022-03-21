import { useTodos } from "../containers/TodoListProvider";
import { type Todo } from "../interfaces";
import styles from "../styles/TodoController.module.css";
import Button from "./Button";
import TodoFilterGroup from "./TodoFilterGroup";

const TodoController = () => {
  const { todos, clearCompleted } = useTodos();
  const numActive = todos.filter((t: Todo) => !t.complete).length;

  const filters = [
    { label: "All", key: "all" },
    { label: "Active", key: "active" },
    { label: "Completed", key: "complete" },
  ];

  return (
    <li className={styles.root}>
      <span>{numActive} items left</span>
      <TodoFilterGroup className={styles.filterGroup} filters={filters} />
      <Button className={styles.completedButton} onClick={clearCompleted}>
        Clear Completed
      </Button>
    </li>
  );
};

export default TodoController;
