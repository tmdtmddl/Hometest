import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./router/Home";
import Signin from "./router/Signin";
import Signup from "./router/Signup";
import Product from "./router/Product";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index Component={Home} />
          <Route path="signin" Component={Signin} />
          <Route path="signup" Component={Signup} />
          <Route path="product" Component={Product} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
