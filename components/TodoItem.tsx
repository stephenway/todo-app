import styles from "../styles/TodoItem.module.css";
import Remove from "../icons/icon-cross.svg";
import Checkbox from "./Checkbox";
import { type Todo } from "../interfaces";
import { useTodos } from "../containers/TodoListProvider";

const TodoItem = ({ todo }: { todo: Todo }): JSX.Element => {
  const { removeTodo } = useTodos();
  return (
    <li key={todo.id} className={styles.item}>
      <Checkbox
        id={todo.id}
        className={styles.checkbox}
        checked={todo.complete}
      />
      <span className={todo.complete ? styles.textComplete : ""}>
        {todo.text}
      </span>
      <Remove
        onClick={() => removeTodo(todo.id)}
        className={`${styles.removeButton} ${styles.alignRight}`}
      />
    </li>
  );
};

export default TodoItem;
