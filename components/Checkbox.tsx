import { useContext } from "react";
import TodoListContext from "../containers/TodoListProvider";
import CheckboxIcon from "../icons/icon-check.svg";
import styles from "../styles/Checkbox.module.css";

interface CheckboxProps {
  id?: number;
  checked?: boolean;
  className?: string;
  disabled?: boolean;
}

const Checkbox = ({
  id,
  checked,
  className,
  disabled,
}: CheckboxProps): JSX.Element => {
  const { completeTodo } = useContext(TodoListContext);

  const handleClick = () => {
    if (!disabled && id) {
      completeTodo(id);
    }
  };

  return (
    <span
      id={id ? `todoCheck-${id}` : undefined}
      className={`${styles.wrapper} ${!disabled ? styles.pointer : ""} ${
        !disabled && !checked ? styles.interactive : ""
      }`}
    >
      <span
        className={`${styles.root} ${checked ? styles.checked : ""} ${
          className || ""
        }`}
        onClick={handleClick}
      >
        {checked && <CheckboxIcon className={styles.icon} />}
      </span>
    </span>
  );
};

export default Checkbox;
