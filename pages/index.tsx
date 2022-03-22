import dynamic from "next/dynamic";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TodoListProvider } from "../containers/TodoListProvider";
const Layout = dynamic(() => import("../containers/Layout"));
const AddTodoForm = dynamic(() => import("../components/AddTodoForm"));
const TodoList = dynamic(() => import("../components/TodoList"));

const IndexPage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <TodoListProvider>
        <Layout title="My Todos">
          <AddTodoForm />
          <TodoList />
        </Layout>
      </TodoListProvider>
    </DndProvider>
  );
};

export default IndexPage;
