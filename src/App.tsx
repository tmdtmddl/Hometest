import { useState } from "react";

const App = () => {
  const [texts, setTexts] = useState<string[]>([]);
  const [text, setText] = useState("");

  return (
    <div>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          if (text.length !== 0) {
            setTexts((prev) => [...prev, text]);
            return setText("");
          }
        }}
      >
        <label htmlFor="todo">todo</label>
        <input
          id="todo"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>추가</button>
      </form>
      <ul>
        {texts.map((text, index) => {
          return (
            <li key={index}>
              <p>
                {index + 1}.{text}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
