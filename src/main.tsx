import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";
import { setAxiosInstance } from "sn-shadcn-kit";

import NoAccess from "./components/no-access";
import "./index.css";

function Container() {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (token === "") {
      if (import.meta.env.MODE === "development") {
        axios.defaults.auth = {
          username: import.meta.env.VITE_REACT_APP_USER,
          password: import.meta.env.VITE_REACT_APP_PASSWORD,
        };
        setAxiosInstance(axios);
        setToken("dev mode");
      } else {
        axios.get(import.meta.env.VITE_TOKEN_PATH).then((r) => {
          axios.defaults.headers["X-userToken"] = r.data.result.sessionToken;
          const token = r.data.result.username == "guest" ? "" : r.data.result.token;
          setAxiosInstance(axios);
          setToken(token);
        });
      }
    }
  }, [token]);

  return (
    <>
      {token !== "" && <App />}
      {token === "" && <NoAccess />}
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Container />
  </StrictMode>
);
