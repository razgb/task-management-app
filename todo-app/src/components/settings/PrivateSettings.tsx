import React, { useState } from "react";
import Button from "../shared/Button";
import useAccessibility from "../../stores/accessibility/useAccessibility";

type InputEventType = React.ChangeEvent<HTMLInputElement>;

export default function PrivateSettings() {
  const { accessibility } = useAccessibility();
  const { fontSizeMap } = accessibility;

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const labelStyles = "font-medium";
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
    console.log("Settings updated");
  }
  return (
    <form className="flex max-w-[800px] flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label
          style={{ fontSize: `${fontSizeMap.base}px` }}
          className={labelStyles}
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          style={{ fontSize: `${fontSizeMap.base}px` }}
        />
      </div>

      <div>
        <label
          style={{ fontSize: `${fontSizeMap.base}px` }}
          className={labelStyles}
          htmlFor="username"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          style={{ fontSize: `${fontSizeMap.base}px` }}
        />
      </div>

      <div>
        <label
          style={{ fontSize: `${fontSizeMap.base}px` }}
          className={labelStyles}
          htmlFor="password"
        >
          New Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          style={{ fontSize: `${fontSizeMap.base}px` }}
        />
      </div>

      <div>
        <label className={labelStyles} htmlFor="profilePicture">
          Profile Picture
        </label>
        <input
          type="file"
          id="profilePicture"
          accept="image/*"
          onChange={handleProfilePictureChange}
          style={{ fontSize: `${fontSizeMap.base}px` }}
        />
      </div>
      <div>
        <Button style={{ fontSize: `${fontSizeMap.base}px` }} type="submit">
          Save Changes
        </Button>
      </div>
    </form>
  );
}
