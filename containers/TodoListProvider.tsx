import { createContext, useContext, useEffect, useRef, useState } from "react";
import { TodoFilter, Todos } from "../interfaces";

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
    setTodos,
    addTodo: (t: string) =>
      t !== "" &&
      setTodos([
        ...todos,
        {
          id: (todos.length > 0 ? todos.slice(-1)[0].id : 0) + 1,
          text: t.trim(),
          complete: false,
        },
      ]),
    removeTodo: (id: number) => setTodos(todos.filter((t) => t.id !== id)),
    completeTodo: (id: number) => {
      const newTodos = todos;
      const completeTodo = newTodos.find((t) => t.id === id);
      completeTodo.complete = !completeTodo.complete;
      setTodos(() => [...newTodos]);
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
