import { useState } from "react";
import { twMerge } from "tailwind-merge";

const App = () => {
  const [yes, setYes] = useState(false);
  const swit = () => {
    setYes(!yes);
  };

  return (
    <div>
      <p
        className={twMerge(
          "font-bold cursor-pointer border-2",
          yes ? "text-black" : "text-red-500"
        )}
        onClick={swit}
      >
        Test
      </p>
    </div>
  );
};

export default App;

// onClick={() => setSelectedPost(null)}
