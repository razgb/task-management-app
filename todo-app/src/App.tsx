import MainContent from "./MainContent";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import useRouter from "./stores/router/useRouter";

export default function App() {
  const { path } = useRouter();

  let content: JSX.Element | undefined = undefined;

  if (path === "/login") {
    content = <LoginPage />;
  } else if (path === "/signup") {
    content = <SignupPage />;
  } else content = <MainContent />;

  return content;
}
