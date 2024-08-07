import { useState } from "react";
import useTheme from "../stores/timer/useTheme";
import useAccessibility from "../stores/accessibility/useAccessibility";
import Button from "../components/shared/Button";
import Link from "../components/shared/Link.tsx";
import TextInput from "../components/flow/custom-input-elements/TextInput.tsx";

export default function LoginPage() {
  const { theme } = useTheme();
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    removeRoundEdges,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (newEmailValue: string) => {
    setEmail(newEmailValue);
  };

  // will create my own custom password format checking functions.
  const handlePasswordChange = (newPasswordValue: string) => {
    setPassword(newPasswordValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${email} \n${password}`);
  };

  return (
    <div
      className={`${theme} flex h-screen flex-col items-center justify-center overflow-hidden bg-primaryBg`}
    >
      <div
        style={{
          borderRadius: removeRoundEdges ? 0 : "",
        }}
        className="w-full max-w-[500px] rounded-3xl bg-secondary-300 p-3"
      >
        <div
          style={{
            borderRadius: removeRoundEdges ? 0 : "",
          }}
          className="rounded-2xl bg-primaryBg p-8"
        >
          <h2
            style={{
              fontSize: fontSizeMap["3xl"],
              color: highContrastMode ? accessibilityTextColor : "",
              letterSpacing: increaseLetterSpacing ? "0.25rem" : "",
            }}
            className="font-medium text-text"
          >
            Login into your account
          </h2>

          <p
            className="mb-6 max-w-[25ch] text-textWeak"
            style={{
              fontSize: fontSizeMap["base"],
            }}
          >
            Please enter your details to access your account.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextInput
              type="email"
              value={email}
              updateState={handleEmailChange}
              label="Email"
            />

            <TextInput
              type="password"
              value={password}
              updateState={handlePasswordChange}
              label="Password"
            />

            <Button
              type="submit"
              style={{
                fontSize: fontSizeMap["lg"],
              }}
            >
              Login
            </Button>
          </form>

          <div className="mt-1 flex items-center">
            <span className="text-textWeak">Don't have an account?</span>
            <Link
              to="/signup"
              className="ml-1 text-textWeak underline hover:text-text active:text-textWeak"
              ariaLabel="Switch to signup page."
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
