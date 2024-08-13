import {
  // useEffect,
  useState,
} from "react";
import useAccessibility from "../../../stores/accessibility/useAccessibility";
import { signup } from "../../../pages/signup/features/signup";
import TextInput from "../custom-input-elements/TextInput";
import Button from "../../shared/Button";

import { useMutation } from "react-query";
import useRouter from "../../../stores/router/useRouter";

export default function SignupForm({
  updateSignupError,
}: {
  updateSignupError: (formatError: {
    isError: boolean;
    message: string;
  }) => void;
}) {
  const { accessibility } = useAccessibility();
  const { fontSizeMap } = accessibility;
  const { updatePath } = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const defaultErrorState = {
    isError: false,
    message: "",
  };

  const mutation = useMutation({
    mutationFn: signup,
    mutationKey: "signup",
    onError: (err) => {
      console.log(err);
      if (err instanceof Error) {
        updateSignupError({
          isError: true,
          message: err.message,
        });
      } else {
        updateSignupError({
          isError: true,
          message:
            "An unexpected error occurred. Check your connection and try again.",
        });
      }
    },
    onSuccess: () => {
      updatePath("/dashboard");
    },
  });

  const { status } = mutation;

  const handleNameChange = (newEmailValue: string) => {
    updateSignupError(defaultErrorState);
    setName(newEmailValue);
  };
  const handleEmailChange = (newEmailValue: string) => {
    updateSignupError(defaultErrorState);
    setEmail(newEmailValue);
  };
  const handlePasswordChange = (newPasswordValue: string) => {
    updateSignupError(defaultErrorState);
    setPassword(newPasswordValue);
  };

  // useEffect(() => {
  //   // this is a place holder to redirect the user to the dashboard if they are already logged in.
  // });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate({ name, email, password });
      }}
      className="flex max-w-[400px] flex-col gap-6"
    >
      <div className="flex flex-col gap-3">
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
        style={{
          fontSize: fontSizeMap.lg,
        }}
        type="submit"
        disabled={status === "loading"}
        loading={status === "loading"}
      >
        Signup
      </Button>
    </form>
  );
}
