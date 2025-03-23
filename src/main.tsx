import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import MainContext from "./MainContext.tsx";
import DarkOrLight from "./DarkOrLight.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkOrLight />
  </StrictMode>
);
