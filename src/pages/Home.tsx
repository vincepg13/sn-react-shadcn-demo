import axios from "axios";
import { useState, useEffect } from "react";
import { WelcomeCard } from "@/components/shadcn/welcome-card";

function Home() {
  const [myName, setMyName] = useState<string | undefined>(undefined);

  useEffect(() => {
    axios.get("/api/now/table/sys_user?sysparm_query=sys_id=javascript:gs.getUserID()").then((r) => {
      if (r.data && r.data.result) setMyName(r.data.result[0].name);
    });
  }, []);

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-[1000px]">
          <WelcomeCard user={myName}/>
        </div>
      </div>
    </>
  );
}

export default Home;
