import { useEffect, useState } from "react";
import TodoForm from "./Todoform";
import TodoItem from "./TodoItem";

const App = () => {
  const loadTodos = () => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : []; // 로컬에 저장할 것임 (다시 들어와도 남아있게)
  };

  const [todos, setTodos] = useState<string[]>(loadTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className=" flex flex-col justify-center items-center font-bold gap-3">
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
              payload={todo} //payload라는 이름으로 todo를 넘겨줌
            />
          );
        })}
      </ul>
    </div>
  );
};

export default App;
