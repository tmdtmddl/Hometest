import React, { useEffect, useState } from "react";
import useCounter from "./useCounter";
const MAX_CAPACITY = 10;

const Accommodate = () => {
  const [isFull, setIsFull] = useState(false);
  const { count, increaseCount, decreaseCount } = useCounter();

  useEffect(() => {
    console.log("=============");
    console.log("useEffect() is called.");
    console.log(`isFull:${isFull}`);
  });

  useEffect(() => {
    setIsFull(count >= MAX_CAPACITY);
    console.log(`Current count value:${count}`);
  }, [count]);
  return (
    <div className="p-16">
      <p>{`총 ${count}명 수용했습니다.`}</p>
      <button
        onClick={increaseCount}
        disabled={isFull}
        className="bg-amber-500"
      >
        입장
      </button>
      <button onClick={decreaseCount} className="bg-red-500">
        퇴장
      </button>
      {isFull && <p className="text-red-600">정원이 가득 찼습니다.</p>}
    </div>
  );
};

export default Accommodate;
