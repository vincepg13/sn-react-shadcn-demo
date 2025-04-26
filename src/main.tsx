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
        const username = import.meta.env.VITE_REACT_APP_USER;
        const password = import.meta.env.VITE_REACT_APP_PASSWORD;
        axios.defaults.auth = {
          username,
          password,
        };
        console.log(
          "DEV MODE - set default username and password ",
          axios.defaults.auth
        );
        setAxiosInstance(axios); // ✅ Add this here too
        setToken("dev mode");
      } else {
        axios.get(import.meta.env.VITE_TOKEN_PATH).then((r) => {
          axios.defaults.headers["X-userToken"] = r.data.result.sessionToken;
          console.log(
            "PROD MODE - received ServiceNow token: ",
            r.data.result.sessionToken
          );

          const token =
            r.data.result.username == "guest" ? "" : r.data.result.token;
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
