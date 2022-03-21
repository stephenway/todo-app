import { FC, memo } from "react";
import { HTMLProps } from "../interfaces/primitive";
import styles from "../styles/Button.module.css";

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  className?: string;
  active?: boolean;
}

const Button: FC<ButtonProps> = ({ children, className, active, ...props }) => {
  return (
    <button
      className={`${styles.root} ${active ? styles.active : ""} ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default memo(Button);
