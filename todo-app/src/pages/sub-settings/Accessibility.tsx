import React, { useState } from "react";
import Button from "../../components/shared/Button";
import { Moon, Sun, ZoomIn, ZoomOut, Type } from "lucide-react";

type InputEventType = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export default function Accessibility() {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState("medium");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);

  const labelStyles = "text-lg font-medium text-text";
  const inputStyles =
    "w-full rounded-xl text-lg bg-secondaryBgWeak p-3 outline-none placeholder:text-textPlaceholder focus:outline-focusOutline focus:outline-2 transition-colors";
  const inputContainerStyle = "flex flex-col gap-2 mb-6";
  const toggleContainerStyle =
    "flex items-center justify-between bg-secondaryBgWeak rounded-xl p-4";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Accessibility settings updated");
  }

  return (
    <div className="h-full overflow-y-auto rounded-2xl bg-primaryBg p-6">
      <h2 className="mb-8 text-3xl font-bold text-heading">
        Accessibility Settings
      </h2>
      <form
        className="flex max-w-[600px] flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className={inputContainerStyle}>
          <label className={labelStyles} htmlFor="fontSize">
            Font Size
          </label>
          <div className="flex items-center gap-4">
            <ZoomOut size={20} />
            <input
              type="range"
              id="fontSize"
              className="w-full"
              min="0"
              max="2"
              step="1"
              value={fontSize === "small" ? 0 : fontSize === "medium" ? 1 : 2}
              onChange={(e: InputEventType) => {
                const value = parseInt(e.target.value);
                setFontSize(
                  value === 0 ? "small" : value === 1 ? "medium" : "large",
                );
              }}
            />
            <ZoomIn size={20} />
          </div>
          <div className="flex justify-between text-sm">
            <span>Small</span>
            <span>Medium</span>
            <span>Large</span>
          </div>
        </div>

        <div className={inputContainerStyle}>
          <label className={labelStyles}>High Contrast Mode</label>
          <div className={toggleContainerStyle}>
            <span className="flex items-center gap-2">
              <Moon size={20} />
              <span>Enable high contrast</span>
            </span>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={highContrast}
                onChange={() => setHighContrast(!highContrast)}
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
            </label>
          </div>
        </div>

        <div className={inputContainerStyle}>
          <label className={labelStyles}>Reduced Motion</label>
          <div className={toggleContainerStyle}>
            <span className="flex items-center gap-2">
              <Type size={20} />
              <span>Reduce animations</span>
            </span>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={reducedMotion}
                onChange={() => setReducedMotion(!reducedMotion)}
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
            </label>
          </div>
        </div>

        <div className={inputContainerStyle}>
          <label className={labelStyles}>
            Remove rounded edges for entire app
          </label>
          <div className={toggleContainerStyle}>
            <span className="flex items-center gap-2">
              <Sun size={20} />
              <span>Enable rounded edges</span>
            </span>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={keyboardNavigation}
                onChange={() => setKeyboardNavigation(!keyboardNavigation)}
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
            </label>
          </div>
        </div>

        <div className="mt-4">
          <Button type="submit" textsize="xl" variant="default">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
