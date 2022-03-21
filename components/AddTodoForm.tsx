import { useContext, useState } from "react";
import TodoListContext from "../containers/TodoListProvider";
import styles from "../styles/AddTodoForm.module.css";
import Checkbox from "./Checkbox";

const AddTodoForm = () => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useContext(TodoListContext);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addTodo(todo);
    setTodo("");
  };

  const handleInputChange = (evt) => {
    setTodo(evt.target.value);
  };

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Checkbox className={styles.checkbox} disabled />
        <input
          name="todo"
          type="text"
          placeholder="Create a new todo&hellip;"
          value={todo}
          onChange={handleInputChange}
          className={styles.textfield}
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default AddTodoForm;
