import { useState } from "react";
import useTheme from "../../stores/timer/useTheme";
import useAccessibility from "../../stores/accessibility/useAccessibility";
import Link from "../../components/shared/Link";

import Button from "../../components/shared/Button";
import ErrorModal from "../../components/flow/signup/ErrorModal";
import SignupWelcomeSection from "../../components/flow/signup/SignupWelcomeSection";
import AccessibilitySection from "../../components/flow/signup/AccessibilitySection";
import SignupForm from "../../components/flow/signup/SignupForm";

export default function SignupPage() {
  // const mutation = useMutation()

  const { theme } = useTheme();
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    removeRoundEdges,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;

  const defaultErrorState = {
    isError: false,
    message: "",
  };

  const [formatError, setFormatError] = useState(defaultErrorState);

  const updateFormatError = (formatError: {
    isError: boolean;
    message: string;
  }) => {
    setFormatError((prev) => ({
      ...prev,
      ...formatError,
    }));
  };

  return (
    <div
      style={{
        borderRadius: removeRoundEdges ? 0 : "",
      }}
      className={`${theme} flex h-screen items-center justify-center gap-4 overflow-hidden bg-primaryBg`}
    >
      <div
        style={{
          borderRadius: removeRoundEdges ? 0 : "",
        }}
        // prettier-ignore
        className="relative grid max-h-[70dvh] w-[65dvw] max-w-[1000px] grid-cols-1
        grid-rows-4 gap-3 rounded-3xl bg-secondary-200 p-3 lg:grid-cols-2"
      >
        {formatError.isError && (
          <ErrorModal
            isError={formatError.isError}
            message={formatError.message}
          />
        )}

        <SignupWelcomeSection />

        <AccessibilitySection />

        <div
          style={{
            borderRadius: removeRoundEdges ? 0 : "",
          }}
          className="col-start-2 col-end-2 row-span-4 flex w-full flex-col justify-center rounded-2xl bg-primaryBg p-8"
        >
          <h2
            style={{
              fontSize: fontSizeMap["3xl"],
              color: highContrastMode ? accessibilityTextColor : "",
              letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
            }}
            className="font-medium text-text"
          >
            Welcome to task buddy!
          </h2>

          <p
            className="mb-6 max-w-[25ch] text-textWeak"
            style={{
              fontSize: fontSizeMap["base"],
              color: highContrastMode ? accessibilityTextColor : "",
            }}
          >
            Please enter your email and create a secure password to get started.
          </p>

          <SignupForm updateFormatError={updateFormatError} />

          <div className="mt-1 flex items-center">
            <span
              style={{
                color: highContrastMode ? accessibilityTextColor : "",
              }}
              className="text-textWeak"
            >
              Already have an account?
            </span>

            <Link
              to="/login"
              className="ml-1 text-textWeak underline hover:text-text active:text-textWeak"
              ariaLabel="Switch to login page."
            >
              Login
            </Link>
          </div>

          <div className="mt-auto flex items-center">
            <span
              style={{
                color: highContrastMode ? accessibilityTextColor : "",
              }}
              className="mr-1 text-textWeak"
            >
              Quick employer login:
            </span>

            <Button
              style={{
                fontSize: fontSizeMap["sm"],
                fontWeight: "500",
              }}
              // className="ml-1 text-textWeak underline hover:text-text active:text-textWeak"
            >
              use demo account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
