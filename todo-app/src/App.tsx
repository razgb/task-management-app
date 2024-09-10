import MainContent from "./MainContent";
import AuthFlowPage from "./pages/auth-flow/AuthFlowPage";
import LogoutPage from "./pages/logout/LogoutPage";
import useRouter from "./stores/router/useRouter";

export default function App() {
  const { path } = useRouter();
  let content: JSX.Element | undefined = undefined;

  if (path === "/login" || path === "/signup") {
    content = <AuthFlowPage />;
  } else if (path === "/logout") {
    content = <LogoutPage />;
  } else content = <MainContent />;

  return content;
}
