import { createContext, useContext } from "react";
import type { SnUser } from "../App";

const UserContext = createContext<SnUser | null>(null);

export const UserProvider = ({ children, user }: { children: React.ReactNode; user: SnUser }) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = (): SnUser => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};