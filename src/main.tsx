import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Main } from "./app/main/main.tsx";
import { MainProvider } from "./app/providers/main.provider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainProvider>
      <Main />
    </MainProvider>
  </StrictMode>
);
