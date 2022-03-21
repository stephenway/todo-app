import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
import Layout from "../containers/Layout";
import { TodoListProvider } from "../containers/TodoListProvider";

const IndexPage = () => {
  return (
    <TodoListProvider>
      <Layout title="My Todos">
        <AddTodoForm />
        <TodoList />
        <p>Drag and drop to reorder list</p>
      </Layout>
    </TodoListProvider>
  );
};

export default IndexPage;
