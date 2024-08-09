import { useState } from "react";
import { UserContext } from "./UserContext";
import { UserContextType } from "./UserContext";

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserContextType["user"] | undefined>(
    undefined,
  );

  const updateUserState = (newState: UserContextType["user"] | undefined) => {
    setUser(newState);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUserState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
