import { useState } from "react";
import useAccessibility from "../../../stores/accessibility/useAccessibility";
import { signup } from "../../../pages/signup/features/signup";
import TextInput from "../custom-input-elements/TextInput";
import Button from "../../shared/Button";

export default function SignupForm({
  updateFormatError,
}: {
  updateFormatError: (formatError: {
    isError: boolean;
    message: string;
  }) => void;
}) {
  // const mutation = useMutation();

  const { accessibility } = useAccessibility();
  const { fontSizeMap } = accessibility;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const defaultErrorState = {
    isError: false,
    message: "",
  };

  const handleNameChange = (newEmailValue: string) => {
    updateFormatError(defaultErrorState);
    setName(newEmailValue);
  };
  const handleEmailChange = (newEmailValue: string) => {
    updateFormatError(defaultErrorState);
    setEmail(newEmailValue);
  };
  const handlePasswordChange = (newPasswordValue: string) => {
    updateFormatError(defaultErrorState);

    // will create my own custom password format checking functions.
    setPassword(newPasswordValue);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // loading true

    try {
      await signup({ name, email, password });
    } catch (err) {
      console.log(err);

      if (err instanceof Error) {
        updateFormatError({
          isError: true,
          message: err.message,
        });
      } else {
        updateFormatError({
          isError: true,
          message:
            "An unexpected error occurred. Check connection and try again.",
        });
      }
    } finally {
      // loading false
    }
  };
  return (
    <form
      onSubmit={(e) => handleFormSubmit(e)}
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
      >
        Signup
      </Button>
    </form>
  );
}
