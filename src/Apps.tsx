import { useEffect, useRef, useState } from "react";
//! timer만들때 자주 쓰는 구조

const Apps = () => {
  const intervalRef = useRef<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, []);

  return <div></div>;
};

export default Apps;
