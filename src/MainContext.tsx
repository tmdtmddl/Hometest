import React, { useContext } from "react";
import ThemeContext from "./ThemeContext";

const MainContext = (props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div
      className="w-screen h-screen p-1.5"
      style={{
        backgroundColor: theme == "Light" ? "white" : "black",
        color: theme == "Light" ? "black" : "white",
      }}
    >
      <p>테마변경웹사이트</p>
      <button onClick={toggleTheme}>테마변경</button>
    </div>
  );
};

export default MainContext;
