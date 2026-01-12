import React from "react";
import { Dispatch, SetStateAction } from "react";

interface FormProps {
  todos: string[];
  setTodos: Dispatch<SetStateAction<string[]>>;
}
const TodoForm = ({ setTodos, todos }: FormProps) => {
  return (
    <form>
      <input
        type="text"
        className="border cursor-pointer"
        placeholder="할일을 입력하세요!"
      />
      <div>
        <button>추가</button>
      </div>
    </form>
  );
};

export default TodoForm;
