import React, { useCallback, useState } from "react";
import ThemeContext from "./ThemeContext";
import MainContext from "./MainContext";

const DarkOrLight = () => {
  const [theme, setTheme] = useState("Light");
  const toggleTheme = useCallback(() => {
    if (theme === "Light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("Light");
    }
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MainContext />
    </ThemeContext.Provider>
  );
};

export default DarkOrLight;
