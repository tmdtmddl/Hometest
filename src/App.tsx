"use client";
import { useEffect, useRef, useState } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        return setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current !== null) {
      return clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current !== null) {
        return clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const startTimer = () => {
    return setIsRunning(true);
  };

  const pauseTimer = () => {
    return setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
    if (intervalRef.current !== null) {
      return clearInterval(intervalRef.current);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const secs = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return (
    <div>
      <h1>타이머: {formatTime(seconds)}</h1>
      <div className="space-x-2">
        <button onClick={startTimer} disabled={isRunning}>
          시작
        </button>
        <button onClick={pauseTimer} disabled={!isRunning}>
          일시정지
        </button>
        <button onClick={resetTimer}>초기화</button>
      </div>
    </div>
  );
};

export default Timer;
