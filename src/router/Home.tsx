import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navi = useNavigate();
  return (
    <div className="max-w-50 mx-auto flex flex-col items-center mt-100">
      <p className="font-bold text-4xl">Home</p>
      <button
        onClick={() => navi("/signin")}
        className="border rounded bg-teal-700 text-white p-1"
      >
        로그인
      </button>
    </div>
  );
};

export default Home;
