import { useEffect, useRef, useState } from "react";
//✅ setTimeout 예제 (1초마다 실행되도록 재귀 구조)
const TimeoutTimer = () => {
  const duration = 10;
  const [timeLeft, setTimeLeft] = useState(duration);
  const timeoutRef = useRef<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  //현재 코드에서는 tick 함수가 컴포넌트 렌더링마다 새로 생성되지 않기 때문에,의존성 배열에 넣지 않아도 안전합니다.
  //이 코드에서 tick은 useEffect가 실행될 때마다 새로 정의된 걸 캡처해서 씀
  const tick = () => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        setIsRunning(false);
        return 0;
      } else {
        timeoutRef.current = window.setTimeout(tick, 1000);
        return prev - 1;
      }
    });
  };

  useEffect(() => {
    if (isRunning) {
      timeoutRef.current = window.setTimeout(tick, 1000);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isRunning]);

  return (
    <div className="space-y-2">
      <p>남은 시간: {timeLeft}</p>
      <button
        onClick={() => setIsRunning(true)}
        className="px-4 py-1 bg-blue-500 text-white rounded"
      >
        시작
      </button>
      <button
        onClick={() => {
          setIsRunning(false);
          clearTimeout(timeoutRef.current!);
        }}
        className="px-4 py-1 bg-yellow-500 text-white rounded"
      >
        정지
      </button>
    </div>
  );
};

export default TimeoutTimer;
