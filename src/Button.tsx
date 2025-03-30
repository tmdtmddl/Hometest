import React from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

const Button = () => {
  //   const serch = useSearchParams();
  //   console.log(serch);
  //   const location = useLocation();
  //   console.log(location);
  //   const params = useParams();
  //   console.log(params);

  return (
    <form>
      <input
        type="text"
        onKeyDown={({ key }) => {
          console.log(key);
        }}
        className="border"
      />
      <button>hi</button>
    </form>
  );
};

export default Button;
