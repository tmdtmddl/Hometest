import { useState } from "react";
import TodoForm from "./Todoform";
import TodoItem from "./TodoItem";

const App = () => {
  const [todos, setTodos] = useState<string[]>([]);

  return (
    <div className=" flex flex-col justify-center items-center font-bold">
      <h1>todo list</h1>
      <TodoForm todos={todos} setTodos={setTodos} />
      <ul>
        {todos.map((todo, i) => {
          return (
            <TodoItem
              key={i}
              setTodos={setTodos}
              todos={todos}
              index={i}
              payload={todo}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default App;
