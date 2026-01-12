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
    <form className="flex gap-2" onSubmit={onSubmit}>
      <input
        type="text"
        className="border cursor-pointer p-2 rounded-xl  outline-0"
        placeholder="할일을 입력하세요!"
        value={text}
        onChange={onChange}
        ref={ref}
      />
      <div>
        <button
          className=" border-red-300 border-2 p-2 rounded-xl cursor-pointer"
          type="submit"
        >
          추가
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
