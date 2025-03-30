import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Home = () => {
  const navi = useNavigate();
  return (
    <div>
      <button onClick={() => navi("button")}>button</button>
    </div>
  );
};

export default Home;
