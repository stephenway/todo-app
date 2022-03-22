import update from "immutability-helper";
import { useTodos } from "../containers/TodoListProvider";
import styles from "../styles/TodoList.module.css";
import { type Todos, type Todo } from "../interfaces";
import TodoItem from "./TodoItem";
import TodoController from "./TodoController";
import { useCallback } from "react";

const TodoList = (): JSX.Element => {
  const { todos, setTodos } = useTodos();

  const moveTodo = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setTodos((prevTodos: Todos) =>
        update(prevTodos, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevTodos[dragIndex] as Todo],
          ],
        })
      );
    },
    [setTodos]
  );

  const renderTodo = useCallback(
    (todo, i: number) => {
      return <TodoItem key={todo.id} index={i} todo={todo} move={moveTodo} />;
    },
    [moveTodo]
  );

  return (
    <>
      <ul id="todoList" className={styles.root}>
        {todos &&
          todos.length > 0 &&
          todos.map((todo: Todo, i: number) => renderTodo(todo, i))}
        <TodoController />
      </ul>
      {todos?.length > 0 && (
        <p className={styles.subtext}>Drag and drop to reorder list</p>
      )}
    </>
  );
};

export default TodoList;
