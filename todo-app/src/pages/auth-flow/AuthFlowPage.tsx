import { useState } from "react";
import AccessibilitySection from "@/pages/auth-flow/components/AccessibilitySection";
import WelcomeSection from "@/pages/auth-flow/components/WelcomeSection";
import useAccessibility from "@/stores/accessibility/useAccessibility";
import useRouter from "@/stores/router/useRouter";
import useTheme from "@/stores/timer/useTheme";
import LoginPage from "./login/LoginPage";
import SignupPage from "./signup/SignupPage";
import ErrorModal from "@/pages/auth-flow/components/ErrorModal";

export type FlowErrorType = {
  isError: boolean;
  message: string;
};
const defaultErrorState: FlowErrorType = { isError: false, message: "" };

export default function AuthFlowPage() {
  const { theme } = useTheme();
  const { accessibility } = useAccessibility();
  const { removeRoundEdges } = accessibility;
  const { path } = useRouter();

  const [flowError, setFlowError] = useState(defaultErrorState);
  const updateSignupError = (flowError: FlowErrorType) => {
    setFlowError(flowError);
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
      className={`${theme} relative flex h-screen min-h-[600px] items-center justify-center gap-4 overflow-hidden bg-primaryBg`}
    >
      <ErrorModal isError={flowError.isError} message={flowError.message} />

      <div
        style={{
          borderRadius: removeRoundEdges ? 0 : "",
        }}
        // prettier-ignore
        className="relative grid max-h-[70dvh] w-[65dvw] max-w-[800px] grid-cols-1
      grid-rows-4 gap-3 rounded-3xl bg-secondary-400 p-3 lg:grid-cols-2"
      >
        <WelcomeSection />

        <AccessibilitySection flowError={flowError} />

        {flowContent}
      </div>
    </div>
  );
}
