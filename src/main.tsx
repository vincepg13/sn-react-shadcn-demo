import { useEffect, useState, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App, { SnUser } from "./App.jsx";
import axios from "axios";
import { setAxiosInstance } from "sn-shadcn-kit";

import NoAccess from "./components/no-access";
import "./index.css";



function Container() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<SnUser>({ username: "", guid: "" });

  useEffect(() => {
    if (token || user.guid) return;
    const getUserDetails = async () => {
      let userguid = "";
      let username = "";

      const axiosInstance = axios.create({
        withCredentials: true,
      });

      if (import.meta.env.MODE === "development") {
        username = import.meta.env.VITE_REACT_APP_USER;
        const tokenSpoof = import.meta.env.VITE_SPOOF_TOKEN;

        if (tokenSpoof) {
          axiosInstance.defaults.headers["X-UserToken"] = tokenSpoof;
        }
        axiosInstance.defaults.auth = {
          username,
          password: import.meta.env.VITE_REACT_APP_PASSWORD,
        };

        setAxiosInstance(axiosInstance);
        setToken("dev mode");
      } else {
        const r = await axios.get(import.meta.env.VITE_TOKEN_PATH);
        const sessionToken = r.data.result.sessionToken;
        const realToken = r.data.result.username === "guest" ? "" : r.data.result.token;

        axiosInstance.defaults.headers["X-UserToken"] = sessionToken;
        username = r.data.result.username;
        userguid = r.data.result.guid;
        setAxiosInstance(axiosInstance);
        setToken(realToken);
      }

      if (username !== "guest") {
        if (userguid) {
          setUser({ username, guid: userguid });
        } else {
          const userRes = await axiosInstance.get(
            `/api/now/table/sys_user?sysparm_query=user_name=${username}&sysparm_fields=sys_id&sysparm_limit=1`,
            {}
          );
          userguid = userRes.data.result[0].sys_id;
          setUser({ username, guid: userguid });
        }
      }
    };

    getUserDetails();
  }, [token, user.guid]);

  return (
    <>
      {token !== "" && <App user={user}/>}
      {token === "" && <NoAccess />}
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Container />
  </StrictMode>
);
