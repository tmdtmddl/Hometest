import { useEffect, useState } from "react";
import TodoForm from "./Todoform";
import TodoItem from "./TodoItem";
import { PiBreadFill } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import { FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const loadTodos = () => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : []; // 로컬에 저장할 것임 (다시 들어와도 남아있게)
  };

  const [todos, setTodos] = useState<string[]>(loadTodos);

  const navi = useNavigate();

  const [keyword, setKeyword] = useState(""); // 검색에만 사용(폼 제출용은 아님)

  const onChange = (e) => {
    setKeyword(() => e.target.value);
  };

  const filteredTodos = todos.filter((todo) => todo.includes(keyword));

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className=" mt-4  flex flex-col justify-center items-center font-bold gap-3 ">
      <div className="flex items-center relative justify-center  w-full">
        <button
          className="text-4xl text-gray-400 hover:text-sky-300 absolute left-2 p-2 border rounded-2xl border-sky-200 cursor-pointer"
          onClick={() => navi("/calendar")}
        >
          <FaCalendarCheck />
        </button>
        <div className="text-4xl flex items-center gap-2 text-gray-700">
          <PiBreadFill /> <p>파리바게트 알바 일지</p>
        </div>
      </div>

      <div className="border-2 border-gray-300 bg-gray-50 p-3 rounded-2xl flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="search" className="text-sm text-gray-500">
            검색
          </label>
          <div className="flex items-stretch min-w-lg rounded-2xl border-2 border-sky-300 bg-white overflow-hidden">
            <input
              type="text"
              id="search"
              placeholder="검색어 입력하세요"
              className="flex-1 min-w-0 px-3 h-11 outline-0"
              value={keyword}
              onChange={onChange}
            />

            <div className="shrink-0 px-3 h-11 flex items-center justify-center">
              <IoIosSearch className=" text-2xl text-gray-500" />
            </div>
          </div>
        </div>

        <TodoForm todos={todos} setTodos={setTodos} />
      </div>

      <ul>
        {filteredTodos.map((todo, i) => {
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

export default Home;
