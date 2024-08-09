import React, { useState } from "react";
import Button from "../../../../components/shared/Button";
import useAccessibility from "../../../../stores/accessibility/useAccessibility";

type InputEventType = React.ChangeEvent<HTMLInputElement>;

export default function AccountSettings() {
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    removeRoundEdges,
    reduceAnimations,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const labelStyles = "font-medium text-text";
  const inputStyles =
    "w-full rounded-xl bg-secondary-200 p-3 outline-none placeholder:text-textPlaceholder focus:outline-focusOutline focus:outline-2 transition-colors";
  const inputContainerStyle = "flex flex-col gap-2 mb-4";

  function handleEmailChange(e: InputEventType) {
    setEmail(e.target.value);
  }

  function handleUsernameChange(e: InputEventType) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e: InputEventType) {
    setPassword(e.target.value);
  }

  function handleProfilePictureChange(e: InputEventType) {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Account settings updated");
  }

  return (
    <div className="h-full overflow-hidden rounded-2xl bg-primaryBg p-6">
      <h2
        style={{
          fontSize: fontSizeMap["3xl"],
          color: highContrastMode ? accessibilityTextColor : "",
          letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
          borderRadius: removeRoundEdges ? "0" : "",
          transition: reduceAnimations ? "none" : "",
        }}
        className={`mb-4 font-bold text-heading`}
      >
        Account Settings
      </h2>

      <form
        className="flex max-w-[600px] flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className={inputContainerStyle}>
          <label
            className={labelStyles}
            htmlFor="profilePicture"
            style={{ fontSize: fontSizeMap["lg"] }}
          >
            Profile Picture
          </label>
          <input
            type="file"
            id="profilePicture"
            className={`${inputStyles} file:mr-4 file:rounded-full file:border-0 file:bg-mainButtonBg file:px-4 file:py-2 file:text-sm file:font-semibold file:text-textContrast hover:file:bg-mainButtonBgHover`}
            accept="image/*"
            onChange={handleProfilePictureChange}
            style={{ fontSize: fontSizeMap["base"] }}
          />
        </div>

        <div className={inputContainerStyle}>
          <label
            className={labelStyles}
            htmlFor="email"
            style={{ fontSize: fontSizeMap["lg"] }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className={inputStyles}
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            style={{ fontSize: fontSizeMap["base"] }}
          />
        </div>

        <div className={inputContainerStyle}>
          <label
            className={labelStyles}
            htmlFor="username"
            style={{ fontSize: fontSizeMap["lg"] }}
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className={inputStyles}
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
            style={{ fontSize: fontSizeMap["base"] }}
          />
        </div>

        <div className="mt-4">
          <Button type="submit" style={{ fontSize: `${fontSizeMap.base}px` }}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
