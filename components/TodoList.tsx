import { useTodos } from "../containers/TodoListProvider";
import styles from "../styles/TodoList.module.css";
import { type Todo } from "../interfaces";
import TodoItem from "./TodoItem";
import TodoController from "./TodoController";
import { idSort } from "../utils/array";

const TodoList = (): JSX.Element => {
  const { todos } = useTodos();

  return (
    <>
      <ul className={styles.root}>
        {todos &&
          todos.length > 0 &&
          idSort(todos).map((todo: Todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        <TodoController />
      </ul>
      {todos?.length > 0 && (
        <p className={styles.subtext}>Drag and drop to reorder list</p>
      )}
    </>
  );
};

export default TodoList;
