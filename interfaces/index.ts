export type Todo = {
  id: number;
  text: string;
  complete: boolean;
};

export type Todos = Todo[];

export type TodoFilter = "all" | "active" | "complete";
