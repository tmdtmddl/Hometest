import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";4$
import TimerBar from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TimerBar />
  </StrictMode>
);
