import React, { useEffect, useRef, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

interface FormProps {
  todos: string[];
  setTodos: Dispatch<SetStateAction<string[]>>;
  payload?: string;
  todoEdit?: boolean;
  onCancel?: () => void;
}

const TodoForm = ({
  setTodos,
  todos,
  payload,
  todoEdit,
  onCancel,
}: FormProps) => {
  const [todo, setTodo] = useState(payload ?? "");

  const ref = useRef<HTMLInputElement>(null);

  const onChange = (e) => {
    setTodo(() => e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todo.length === 0) {
      return alert("할일을 입력해주세요!");
    }

    setTodos((prev) => {
      let copy = [...prev]; //기존 할 일 목록을 그대로 복사 (복사해서 고치고 원본은 ㄴㄴ(prev=["a","b","c"], copy=["a","b","c"]))

      if (todoEdit) {
        //! 수정모드일때
        const index = todos.findIndex((p) => p === payload); //고칠 대상이 몇 번째에 있는지 찾기 todos뒤지면서 payload랑 같은 것 찾기 찾으면 그 위치 index줌 (ex: index=1)
        if (index >= 0) {
          //index === -1 → 못 찾음 , index >= 0 → 찾음
          copy[index] = todo; //!그 자리에 새 내용으로 교체 (copy=복사본,index는 위치에 있는 내용을 todo로 바꿔라),(index=1이면 copy[1]=todo)
        }
      } else {
        copy.unshift(todo); //없으면 새 할 일을 맨 앞에 넣기
      }

      return copy; //! 완성된 새 목록을 돌려줌 (이렇게 바꾼 결과를 이제 todos로 써주세요)
    });

    alert(todoEdit ? "수정되었습니다." : "추가되었습니다.");
    if (todoEdit && onCancel) {
      //수정하고 수정을 취소할경우에만 다시 todoEdit을 false로 바꿔라
      onCancel();
    }

    setTodo(""); // 입력창 비우기
  };

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <label htmlFor="todo" className="text-sm text-gray-500">
        {todoEdit ? "" : "추가"}
      </label>
      <div
        className={twMerge(
          "flex items-stretch min-w-lg rounded-2xl border-2 border-sky-300 bg-white overflow-hidden ",
          todoEdit && "min-w-135"
        )}
      >
        <input
          type="text"
          id="todo"
          name="todo"
          className=" flex-1 min-w-0 px-3 h-11 outline-0"
          placeholder="메모를 입력하세요!"
          value={todo}
          onChange={onChange}
          ref={ref}
        />

        <div className="flex items-center">
          {/* 수정시에는 수정, 그냥 입력해서 하는경우에는 추가 */}
          <button
            className=" shrink-0 px-3 h-11 flex items-center justify-center whitespace-nowrap text-gray-500 hover:text-sky-600 "
            type="submit"
          >
            {todoEdit ? "수정" : "추가"}
          </button>

          {todoEdit && (
            <button
              className="shrink-0 px-3 h-11 flex items-center justify-center whitespace-nowrap text-gray-400 hover:text-sky-400"
              type="button"
              onClick={onCancel}
            >
              취소
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TodoForm;
