import useAccessibility from "@/stores/accessibility/useAccessibility";
import Link from "@/shared-components/Link";
import SignupForm from "@/pages/auth-flow/components/signup/SignupForm";
import Recruiters from "../Recruiters";

type Parameters = {
  updateSignupError: (err: { message: string; isError: boolean }) => void;
};

export default function SignupPage({ updateSignupError }: Parameters) {
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    removeRoundEdges,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;

  return (
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
        Welcome to TaskBuddy
      </h2>

      <p
        className="mb-6 max-w-[25ch] text-textWeak"
        style={{
          fontSize: fontSizeMap["base"],
          color: highContrastMode ? accessibilityTextColor : "",
          letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
        }}
      >
        Please enter your email and create a secure password to get started.
      </p>

      <SignupForm updateSignupError={updateSignupError} />

      <div className="mt-1 flex items-center">
        <span
          style={{
            color: highContrastMode ? accessibilityTextColor : "",
            letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
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

      <Recruiters />
    </div>
  );
}
