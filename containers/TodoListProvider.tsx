import { createContext, useContext, useEffect, useRef, useState } from "react";
import { TodoFilter, Todos } from "../interfaces";
import { idSort } from "../utils/array";

const TodoListContext = createContext(null);

const useStore = () => {
  const isMounted = useRef(false);
  const [todos, setTodos] = useState<Todos>([]);
  const [filterTodos, setFilterTodos] = useState<TodoFilter>("all");
  const todoList =
    filterTodos === "complete"
      ? todos.filter((t) => t.complete)
      : filterTodos === "active"
      ? todos.filter((t) => !t.complete)
      : todos;

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos !== null) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      isMounted.current = true;
    }
  }, [todos]);

  return {
    todos: todoList,
    addTodo: (t) =>
      t !== "" &&
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: t.trim(),
          complete: false,
        },
      ]),
    removeTodo: (id: number) => setTodos(todos.filter((t) => t.id !== id)),
    completeTodo: (id: number) => {
      const completeTodo = todos.filter((t) => t.id === id)[0];
      completeTodo.complete = !completeTodo.complete;
      const otherTodos = todos.filter((t) => t.id !== id);
      setTodos(idSort([...otherTodos, completeTodo]));
    },
    clearCompleted: () => {
      const activeTodos = todos.filter((t) => !t.complete);
      if (activeTodos.length > 0) setTodos([...activeTodos]);
    },
    filterTodos,
    setFilterTodos,
  };
};

export const useTodos = () => useContext(TodoListContext);

export const TodoListProvider = ({ children }) => (
  <TodoListContext.Provider value={useStore()}>
    {children}
  </TodoListContext.Provider>
);

export default TodoListContext;
