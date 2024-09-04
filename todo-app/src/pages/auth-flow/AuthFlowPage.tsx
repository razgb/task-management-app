import { useState } from "react";
import AccessibilitySection from "../../components/flow/AccessibilitySection";
import WelcomeSection from "../../components/flow/WelcomeSection";
import useAccessibility from "../../stores/accessibility/useAccessibility";
import useRouter from "../../stores/router/useRouter";
import useTheme from "../../stores/timer/useTheme";
import LoginPage from "./login/LoginPage";
import SignupPage from "./signup/SignupPage";
import ErrorModal from "../../components/flow/ErrorModal";

export default function AuthFlowPage() {
  const { theme } = useTheme();
  const { accessibility } = useAccessibility();
  const { removeRoundEdges } = accessibility;
  const { path } = useRouter();

  const defaultErrorState = { isError: false, message: "" };
  const [flowError, setFlowError] = useState(defaultErrorState);

  const updateSignupError = (flowError: {
    isError: boolean;
    message: string;
  }) => {
    setFlowError((prev) => ({
      ...prev,
      ...flowError,
    }));
  };

  let flowContent: JSX.Element | null = null;

  if (path === "/login") {
    flowContent = <LoginPage updateSignupError={updateSignupError} />;
  } else if (path === "/signup") {
    flowContent = <SignupPage updateSignupError={updateSignupError} />;
  } else flowContent = null;

  return (
    <div
      style={{
        borderRadius: removeRoundEdges ? 0 : "",
      }}
      className={`${theme} relative flex h-screen items-center justify-center gap-4 overflow-hidden bg-primaryBg`}
    >
      <ErrorModal
        isError={true}
        message="Login disabled - too many failed attempts. Try again later."
      />

      <div
        style={{
          borderRadius: removeRoundEdges ? 0 : "",
        }}
        // prettier-ignore
        className="relative grid max-h-[70dvh] w-[65dvw] max-w-[1000px] grid-cols-1
      grid-rows-4 gap-3 rounded-3xl bg-secondary-200 p-3 lg:grid-cols-2"
      >
        <WelcomeSection />

        <AccessibilitySection />

        {flowContent}
      </div>
    </div>
  );
}
