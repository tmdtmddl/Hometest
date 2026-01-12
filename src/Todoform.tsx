import React from "react";

const Form = ({ setTodos, Todos }) => {
  return (
    <form>
      <input
        type="text"
        className="border cursor-pointer"
        placeholder="할일을 입력하세요!"
      />
    </form>
  );
};

export default Form;
