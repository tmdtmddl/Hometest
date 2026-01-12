import { useState } from "react";
import Form from "./Todoform";
import Item from "./TodoItem";

const App = () => {
  const [todos, setTodos] = useState<string[]>([]);

  return (
    <div className=" flex flex-col justify-center items-center font-bold">
      <h1>todo list</h1>
      <Form todos={todos} setTodos={setTodos} />
      <ul>
        {todos.map((todo, i) => {
          return (
            <Item
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

// onClick={() => setSelectedPost(null)}
