import { useState } from "react";

const useCounter = () => {
  const [count, setCount] = useState(0);
  const increaseCount = () => setCount((prev) => prev + 1);
  const decreaseCount = () => setCount((prev) => Math.max(prev - 1, 0));
  console.log(count);
  return { count, increaseCount, decreaseCount };
};

export default useCounter;
