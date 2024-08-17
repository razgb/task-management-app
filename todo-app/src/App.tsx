import MainContent from "./MainContent";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import useRouter from "./stores/router/useRouter";

import { auth } from "./main";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth/web-extension";
// import { useUser } from "./stores/user/useUser";
import { UserContextType } from "./stores/user/UserContext";

export default function App() {
  const { path } = useRouter();
  // const { user: userState, updateUserState } = useUser();

  let content: JSX.Element | undefined = undefined;

  if (path === "/login") {
    content = <LoginPage />;
  } else if (path === "/signup") {
    content = <SignupPage />;
  } else content = <MainContent />;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.warn("User signed out. ");
        // updateUserState(null);
        return;
      }

      /*
      const { email, emailVerified, displayName, photoURL, providerId, uid } =
        user;

      if (isUserStateEqual(userState, user)) return; // prevent infinite update loop.

      if (email && displayName && providerId && uid) {
        updateUserState({
          email,
          emailVerified,
          displayName,
          photoURL,
          providerId,
          uid,
        });
      }
      */
    });

    return () => {
      unsub();
    };
  });

  return content;
}

/*
const isUserStateEqual = (
  userState: UserContextType["user"],
  user: unknown,
) => {
  if (!userState || !user) return false;
  const { email, emailVerified, displayName, photoURL, providerId, uid } =
    userState;

  const userStateTyped = user as Partial<UserContextType["user"]>;
  if (!userStateTyped) return false;

  return (
    "email" in userStateTyped &&
    userStateTyped.email === email &&
    "emailVerified" in userStateTyped &&
    userStateTyped.emailVerified === emailVerified &&
    "displayName" in userStateTyped &&
    userStateTyped.displayName === displayName &&
    "photoURL" in userStateTyped &&
    userStateTyped.photoURL === photoURL &&
    "providerId" in userStateTyped &&
    userStateTyped.providerId === providerId &&
    "uid" in userStateTyped &&
    userStateTyped.uid === uid
  );
};
 */
