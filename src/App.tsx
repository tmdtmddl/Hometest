import { useEffect, useRef, useState } from "react";

const TimerBar = () => {
  const duration = 10; // 총 시간 (초)
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false); // 타이머 상태
  const intervalRef = useRef<number | null>(null); // setInterval 참조

  useEffect(() => {
    //만약 타이머가 멈춰 있는 상태면 아무 일도 하지 않고 종료(isRunning이 false면 실행할 필요가 없으니까)
    if (!isRunning) {
      return;
    }
    //1초마다 실행되는 타이머(setInterval)를 만들고, 그것을 intervalRef.current에 저장(이 참조는 나중에 정지하거나 초기화할 때 사용)
    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        //남은 시간이 1초 이하가 되면:타이머를 멈추고(clearInterval),isRunning을 false로 바꾸고 시간도 0으로 설정 => 이걸로 타이머가 자동으로 끝납니다.
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          return 0;
        }
        //아직 시간이 남았으면 1초를 줄임
        return prev - 1;
      });
      //위의 로직을 1초마다 실행
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);
  //! 일시정지
  const handlePause = () => {
    clearInterval(intervalRef.current!);
    return setIsRunning(false);
  };
  //! 다시 시작 or 시작
  const handleStart = () => {
    if (timeLeft > 0) {
      return setIsRunning(true);
    }
  };
  //! 초기화
  const handleReset = () => {
    clearInterval(intervalRef.current!);
    setTimeLeft(duration);
    return setIsRunning(false);
  };

  const percentage = (timeLeft / duration) * 100;

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <p className="text-center text-lg font-bold">남은 시간: {timeLeft}초</p>
      <div className="w-full h-4 bg-gray-300 rounded">
        <div
          className="h-full bg-green-500 rounded transition-all duration-1000"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-center gap-2">
        {!isRunning && (
          <button
            className="px-4 py-1 bg-blue-500 text-white rounded"
            onClick={handleStart}
          >
            시작
          </button>
        )}
        {isRunning && (
          <button
            className="px-4 py-1 bg-yellow-500 text-white rounded"
            onClick={handlePause}
          >
            일시정지
          </button>
        )}
        <button
          className="px-4 py-1 bg-red-500 text-white rounded"
          onClick={handleReset}
        >
          초기화
        </button>
      </div>
    </div>
  );
};

export default TimerBar;

//우리는 setInterval로 만든 타이머를 나중에 멈추기 위해 clearInterval()을 써야 하죠.

// 함수로 쓰면 안되는 이유 const id = setInterval(...);clearInterval(id) => 리액트 함수형 컴포넌트는 상태가 바뀌면 TimerBar() 함수 전체가 다시 실행돼요.즉 이런 식이면 안 됩니다

//해결책 : useRef는 값을 기억하지만 컴포넌트를 리렌더링하지는 않음 그래서 리렌더링이 되더라도 intervalRef.current에 저장된 값은 유지됨
