import { useState } from "react";
import useAccessibility from "../../../stores/accessibility/useAccessibility";
import Button from "../../../components/shared/Button";
import Link from "../../../components/shared/Link.tsx";
import TextInput from "../../../components/flow/custom-input-elements/TextInput.tsx";
import Recruiters from "../Recruiters.tsx";
import { useMutation } from "react-query";
import { loginUserToFirebase } from "./async/loginUserToFirebase.ts";
import useRouter from "../../../stores/router/useRouter.tsx";
import ErrorModal from "../../../components/flow/ErrorModal.tsx";

type Parameters = {
  updateSignupError: (err: { message: string; isError: boolean }) => void;
};

export default function LoginPage({ updateSignupError }: Parameters) {
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    removeRoundEdges,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;

  const { updatePath } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: loginUserToFirebase,
    mutationKey: "signup",
    onError: (err: unknown) => {
      if (err instanceof Error) {
        updateSignupError({
          isError: true,
          message: err.message,
        });
      } else {
        updateSignupError({
          isError: true,
          message:
            "An unexpected error occurred while signing you up. Check your connection and try again.",
        });
      }
    },
    onSuccess: () => {
      updatePath("/dashboard");
    },
    retry: 2,
    retryDelay: 500,
  });

  const handleEmailChange = (newEmailValue: string) => {
    setEmail(newEmailValue);
  };

  const handlePasswordChange = (newPasswordValue: string) => {
    setPassword(newPasswordValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutateAsync({ email, password });
  };

  return (
    <div
      // prettier-ignore
      className={` col-start-2 col-end-2 row-span-4 flex w-full flex-col
 rounded-2xl bg-primaryBg p-8`}
    >
      <div
        style={{
          borderRadius: removeRoundEdges ? 0 : "",
        }}
      >
        <div
          style={{
            borderRadius: removeRoundEdges ? 0 : "",
          }}
          className="rounded-2xl bg-primaryBg"
        >
          <h2
            style={{
              fontSize: fontSizeMap["3xl"],
              color: highContrastMode ? accessibilityTextColor : "",
              letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
            }}
            className="font-medium text-text"
          >
            Login into your account
          </h2>

          <p
            className="mb-6 max-w-[25ch] text-textWeak"
            style={{
              fontSize: fontSizeMap["base"],
              color: highContrastMode ? accessibilityTextColor : "",
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
              loading={isLoading}
              disabled={isLoading}
            >
              Login
            </Button>
          </form>

          <div className="mt-1 flex items-center">
            <span
              style={{
                color: highContrastMode ? accessibilityTextColor : "",
              }}
              className="text-textWeak"
            >
              Don't have an account?
            </span>
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

      <Recruiters />
    </div>
  );
}
