import {
  // useEffect,
  useState,
} from "react";
import useAccessibility from "@/stores/accessibility/useAccessibility";
import TextInput from "@/pages/auth-flow/components/TextInput";
import Button from "@/shared-components/Button";

import { useMutation } from "react-query";
import useRouter from "@/stores/router/useRouter";
import { signup } from "@/pages/auth-flow/signup/async/signup";

type Parameters = {
  updateSignupError: (err: { message: string; isError: boolean }) => void;
};

export default function SignupForm({ updateSignupError }: Parameters) {
  const { accessibility } = useAccessibility();
  const { fontSizeMap } = accessibility;
  const { updatePath } = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const defaultErrorState = {
    isError: false,
    message: "",
  };

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: signup,
    mutationKey: "signup",
    onError: (err) => {
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
    updateSignupError(defaultErrorState);
    setEmail(newEmailValue);
  };
  const handlePasswordChange = (newPasswordValue: string) => {
    updateSignupError(defaultErrorState);
    setPassword(newPasswordValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutateAsync({ email, password });
  };

  // useEffect(() => {
  //   // this is a place holder to redirect the user to the dashboard if they are already logged in.
  // });

  return (
    <form onSubmit={handleSubmit} className="flex max-w-[400px] flex-col gap-6">
      <div className="flex flex-col gap-3">
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
        style={{
          fontSize: fontSizeMap.lg,
        }}
        type="submit"
        disabled={isLoading}
        loading={isLoading}
      >
        Signup
      </Button>
    </form>
  );
}
