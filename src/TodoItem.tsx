import React, { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import TodoForm from "./Todoform";
import { FaTrashAlt } from "react-icons/fa";

interface ItemProps {
  todos: string[];
  setTodos: Dispatch<SetStateAction<string[]>>;
  index: number;
  payload: string; //새로 받으면 그걸로 교체
}

const TodoItem = ({ index, payload, setTodos, todos }: ItemProps) => {
  const [todoEdit, setTodoEdit] = useState(false);

  const todoSwtich = () => {
    setTodoEdit((prev) => !prev);
  };

  const todoDelete = () => {
    if (confirm("삭제하시겠습니까?")) {
      setTodos((prev) => prev.filter((item) => item !== payload)); //삭제 버튼을 누른 그 TodoItem이 들고 있는 payload를 기준으로,todos(prev)를 전부 돌면서(item 하나씩) payload와 같은 값만 빼고 남긴다.
      alert("삭제했습니다");
    } else {
      alert("취소했습니다");
    }
  };

  return (
    <li className="p-3 border-2 border-gray-300 hover:border-sky-300 rounded-xl my-2 flex justify-between items-center gap-4 max-w-xl min-w-xl hover:bg-sky-50">
      {todoEdit ? (
        <TodoForm
          setTodos={setTodos}
          todos={todos}
          payload={payload} //paylaod를 넘겨줘야 수정 가능
          todoEdit={todoEdit} //수정용
          onCancel={todoSwtich} //TODO: 취소용
        />
      ) : (
        <>
          <div className="flex-1 warp-break-words whitespace-normal">
            {index + 1}. {payload}
          </div>
          <div className="flex gap-2">
            <button
              className="  hover:text-sky-600 text-red-400 font-bold cursor-pointer"
              onClick={todoDelete}
            >
              <FaTrashAlt />
            </button>
            <button
              className="  hover:text-sky-600 text-sky-400 font-bold cursor-pointer"
              onClick={todoSwtich}
            >
              수정
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
