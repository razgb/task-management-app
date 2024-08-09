import { createContext } from "react";

export type UserContextType = {
  user:
    | {
        name: string;
      }
    | undefined;

  updateUserState: (newState: UserContextType["user"] | undefined) => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
