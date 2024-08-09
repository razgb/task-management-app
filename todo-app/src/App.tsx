import MainContent from "./MainContent";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import useRouter from "./stores/router/useRouter";

import { auth } from "./main";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth/web-extension";

export default function App() {
  const { path } = useRouter();

  let content: JSX.Element | undefined = undefined;

  if (path === "/login") {
    content = <LoginPage />;
  } else if (path === "/signup") {
    content = <SignupPage />;
  } else content = <MainContent />;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);

        // 1. Update user context.
      } else {
        console.warn("User signed out. ");
      }
    });

    return () => {
      unsub();
    };
  });

  return content;
}
