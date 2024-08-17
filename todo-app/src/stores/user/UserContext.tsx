import { createContext } from "react";

export type UserContextType = {
  user: {
    email: string;
    emailVerified: boolean;
    displayName: string;
    photoURL: string | null;
    providerId: string;
    uid: string;
  } | null;

  updateUserState: (newState: UserContextType["user"] | null) => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
