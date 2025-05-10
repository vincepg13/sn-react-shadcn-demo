import { useEffect, useState, StrictMode } from "react";
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
      const axiosInstance = axios.create({
        withCredentials: true
      });

      if (import.meta.env.MODE === "development") {
        const tokenSpoof = import.meta.env.VITE_SPOOF_TOKEN;

        if (tokenSpoof) {
          axiosInstance.defaults.headers["X-UserToken"] = tokenSpoof;
        }
        axiosInstance.defaults.auth = {
          username: import.meta.env.VITE_REACT_APP_USER,
          password: import.meta.env.VITE_REACT_APP_PASSWORD,
        };

        setAxiosInstance(axiosInstance);
        setToken("dev mode");
      } else {
        axios.get(import.meta.env.VITE_TOKEN_PATH).then((r) => {
          const sessionToken = r.data.result.sessionToken;
          const realToken = r.data.result.username === "guest" ? "" : r.data.result.token;

          axiosInstance.defaults.headers["X-UserToken"] = sessionToken;
          setAxiosInstance(axiosInstance);
          setToken(realToken);
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
