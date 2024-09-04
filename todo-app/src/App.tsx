import MainContent from "./MainContent";
import AuthFlowPage from "./pages/auth-flow/AuthFlowPage";
import useRouter from "./stores/router/useRouter";

import { auth } from "./main";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth/web-extension";
// import { useUser } from "./stores/user/useUser";

export default function App() {
  const { path } = useRouter();
  // const { user: userState, updateUserState } = useUser();

  let content: JSX.Element | undefined = undefined;

  if (path === "/login" || path === "/signup") {
    content = <AuthFlowPage />;
  } else content = <MainContent />;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.warn("User signed out. ");
        // updateUserState(null);
        return;
      }
    });

    return () => {
      unsub();
    };
  });

  return content;
}
