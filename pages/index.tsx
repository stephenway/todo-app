import dynamic from "next/dynamic";
import { TodoListProvider } from "../containers/TodoListProvider";
const Layout = dynamic(() => import("../containers/Layout"));
const AddTodoForm = dynamic(() => import("../components/AddTodoForm"));
const TodoList = dynamic(() => import("../components/TodoList"));

const IndexPage = () => {
  return (
    <TodoListProvider>
      <Layout title="My Todos">
        <AddTodoForm />
        <TodoList />
      </Layout>
    </TodoListProvider>
  );
};

export default IndexPage;
