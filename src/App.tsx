import { useState } from "react";
import TodoForm from "./Todoform";
import TodoItem from "./TodoItem";

const App = () => {
  const [todos, setTodos] = useState<string[]>([]);

  return (
    <div className=" flex flex-col justify-center items-center font-bold gap-2">
      <h1 className="text-3xl">파리바게트 알바 일지</h1>
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
