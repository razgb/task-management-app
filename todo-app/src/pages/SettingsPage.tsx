import React, { useState } from "react";
import Button from "../components/shared/Button";

function SettingsPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleProfilePictureChange(e: React.ChangeEvent<HTMLInputElement>) {
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
    <div className="scrollbar-thumb-scrollbar h-full overflow-hidden overflow-y-auto rounded-2xl bg-primaryBg p-4 scrollbar-thin scrollbar-track-transparent">
      <h1 className="mb-6 text-2xl font-bold text-heading">Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="mt-1 block w-full rounded-md border-secondary-900 bg-primaryBg px-3 py-2 text-text focus:border-secondary-900 focus:outline-none focus:ring focus:ring-secondary-900 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-text"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="mt-1 block w-full rounded-md border-secondary-900 bg-primaryBg px-3 py-2 text-text focus:border-secondary-900 focus:outline-none focus:ring focus:ring-secondary-900 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-text"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="mt-1 block w-full rounded-md border-secondary-900 bg-primaryBg px-3 py-2 text-text focus:border-secondary-900 focus:outline-none focus:ring focus:ring-secondary-900 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="profilePicture"
            className="block text-sm font-medium text-text"
          >
            Profile Picture
          </label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="mt-1 block w-full text-sm text-text file:mr-4 file:rounded-full file:border-0 file:bg-btnBg file:px-4 file:py-2 file:text-sm file:font-semibold file:text-text hover:file:bg-btnHover"
          />
        </div>
        <div>
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SettingsPage;
