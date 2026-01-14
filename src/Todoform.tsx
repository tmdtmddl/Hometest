import React, { useEffect, useRef, useState } from "react";
import { Dispatch, SetStateAction } from "react";

interface FormProps {
  todos: string[];
  setTodos: Dispatch<SetStateAction<string[]>>;
}

const TodoForm = ({ setTodos, todos }: FormProps) => {
  const [text, setText] = useState("");

  const ref = useRef<HTMLInputElement>(null);

  const onChange = (e) => {
    setText(() => e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text.length === 0) {
      return alert("할일을 입력해주세요!");
    }

    setTodos((prev) => [...prev, text]); //  배열에 추가
    setText(""); // 입력창 비우기
  };

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <form className="flex" onSubmit={onSubmit}>
      <input
        type="text"
        className=" border-2 border-r-0  border-sky-500 rounded-l-2xl cursor-pointer p-2   outline-0"
        placeholder="메모를 입력하세요!"
        value={text}
        onChange={onChange}
        ref={ref}
      />
      <div>
        <button
          className=" border-2 border-l-0 border-sky-500  p-2 rounded-r-2xl cursor-pointer"
          type="submit"
        >
          추가
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
