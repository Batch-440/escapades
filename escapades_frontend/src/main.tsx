import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./provider/authProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
