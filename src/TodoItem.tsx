import React from "react";
import { Dispatch, SetStateAction } from "react";

interface ItemProps {
  todos: string[];
  setTodos: Dispatch<SetStateAction<string[]>>;
  index: number;
  payload: string;
}

const TodoItem = ({ todos, setTodos }: ItemProps) => {
  return <div></div>;
};

export default TodoItem;
