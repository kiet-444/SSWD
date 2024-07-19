import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { LoginProvider } from "context/LoginProvider";
import App from "./App";
import { RefreshProvider } from "context/RefreshProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <LoginProvider>
      <RefreshProvider>
      <App />
      </RefreshProvider>
    </LoginProvider>
  </BrowserRouter>
);
