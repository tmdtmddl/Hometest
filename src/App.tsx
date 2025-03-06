import React from "react";

const App = () => {
  const animal = "";

  // switch (기준이 될 비교 값) case 뒤에 값이 key의 값과 일치할때 안에 코드를 실행
  // 일치하는 키값이 없으면 default뒤의 값 실행(default는 생략가능=>아무것도 실행 ㄴㄴ)
  // break가있는 곳까지 실행

  switch (animal) {
    case "Cat":
      console.log("야옹  ");
      break;
    case "Dog":
      console.log("멍멍");
      break;
    case "Cow":
      console.log("음메");
      break;

    default:
      console.log("일치하는 동물소리가 없습니다.");
      break;
  }
  return <div></div>;
};

export default App;
