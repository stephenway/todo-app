import { useDrag, useDrop } from "react-dnd";
import styles from "../styles/TodoItem.module.css";
import Remove from "../icons/icon-cross.svg";
import Checkbox from "./Checkbox";
import { type Todo } from "../interfaces";
import { useTodos } from "../containers/TodoListProvider";
import { useRef } from "react";
import type { XYCoord, Identifier } from "dnd-core";

const ItemTypes = {
  TODO_ITEM: "todoItem",
};

interface TodoItemProps {
  todo: Todo;
  index: number;
  move: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const style = {
  width: 400,
};

const TodoItem = ({ todo, index, move }: TodoItemProps): JSX.Element => {
  const ref = useRef<HTMLLIElement>(null);
  const { removeTodo } = useTodos();

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.TODO_ITEM,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      move(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TODO_ITEM,
    item: () => {
      return { id: todo.id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <li
      ref={ref}
      className={styles.item}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <Checkbox
        id={todo.id}
        className={styles.checkbox}
        checked={todo.complete}
      />
      <span
        className={`${styles.text} ${todo.complete ? styles.textComplete : ""}`}
      >
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
