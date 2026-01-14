import React from "react";
import { Dispatch, SetStateAction } from "react";

interface ItemProps {
  todos: string[];
  setTodos: Dispatch<SetStateAction<string[]>>;
  index: number;
  payload: string; //새로 받으면 그걸로 교체
}

const TodoItem = ({ index, payload, setTodos }: ItemProps) => {
  const todoDelete = () => {
    if (confirm("삭제하시겠습니까?")) {
      setTodos((prev) => prev.filter((item) => item !== payload)); //삭제 버튼을 누른 그 TodoItem이 들고 있는 payload를 기준으로,todos(prev)를 전부 돌면서(item 하나씩) payload와 같은 값만 빼고 남긴다.
      alert("삭제했습니다");
    } else {
      alert("취소했습니다");
    }
  };

  return (
    <li className="p-2 border rounded-xl my-2 flex justify-between items-center gap-4">
      <div>
        {index}.{payload}
      </div>
      <div>
        <button
          className=" cursor-pointer hover:text-sky-600"
          onClick={todoDelete}
        >
          삭제
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
