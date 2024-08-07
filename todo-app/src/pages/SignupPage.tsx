import React, { useState } from "react";
import useTheme from "../stores/timer/useTheme";
import useAccessibility from "../stores/accessibility/useAccessibility";
import Button from "../components/shared/Button";
import Link from "../components/shared/Link";
import TextInput from "../components/flow/custom-input-elements/TextInput";

export default function SignupPage() {
  const { theme } = useTheme();
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    removeRoundEdges,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (newEmailValue: string) => {
    setName(newEmailValue);
  };
  const handleEmailChange = (newEmailValue: string) => {
    setEmail(newEmailValue);
  };
  const handlePasswordChange = (newPasswordValue: string) => {
    // will create my own custom password format checking functions.
    setPassword(newPasswordValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(`${name} \n${email} \n${password}`);
  };

  return (
    <div
      style={{
        borderRadius: removeRoundEdges ? 0 : "",
      }}
      className={`${theme} flex h-screen flex-col items-center justify-center overflow-hidden bg-primaryBg`}
    >
      <div
        style={{
          borderRadius: removeRoundEdges ? 0 : "",
        }}
        className="w-full max-w-[500px] rounded-3xl bg-secondary-200 p-3"
      >
        <div className="rounded-2xl bg-primaryBg p-8">
          <h2
            style={{
              fontSize: fontSizeMap["3xl"],
              color: highContrastMode ? accessibilityTextColor : "",
              letterSpacing: increaseLetterSpacing ? "0.25rem" : "",
            }}
            className="font-medium text-text"
          >
            Sign up your account
          </h2>

          <p
            className="mb-6 max-w-[25ch] text-textWeak"
            style={{
              fontSize: fontSizeMap["base"],
            }}
          >
            Please enter your email and create a secure password to get started.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <TextInput
                type="name"
                value={name}
                updateState={handleNameChange}
                label="Name"
              />

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
            </div>

            <Button
              type="submit"
              style={{
                fontSize: fontSizeMap["lg"],
              }}
            >
              Signup
            </Button>
          </form>

          <div className="mt-1 flex items-center">
            <span className="text-textWeak">Already have an account?</span>

            <Link
              to="/login"
              className="ml-1 text-textWeak underline hover:text-text active:text-textWeak"
              ariaLabel="Switch to login page."
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
