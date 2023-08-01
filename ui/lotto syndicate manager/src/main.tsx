import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AuthContext } from "./contexts/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthContext.AuthProvider>
      <App />
    </AuthContext.AuthProvider>
  </BrowserRouter>
);
