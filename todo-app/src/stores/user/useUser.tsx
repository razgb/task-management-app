import { useContext } from "react";
import { UserContext } from "./UserContext";

export const useUser = () => {
  const userContext = useContext(UserContext);
  if (!userContext)
    throw new Error("Use useUser hook inside a UserContextProvider.");

  return userContext;
};
