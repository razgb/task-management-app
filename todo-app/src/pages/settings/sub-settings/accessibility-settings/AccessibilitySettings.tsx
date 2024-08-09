import { Moon, Type, Scan, Space } from "lucide-react";
import ToggleField from "./ToggleField";
import useAccessibility from "../../../../stores/accessibility/useAccessibility";
import { useState } from "react";
import { AccessibilityContextType } from "../../../../stores/accessibility/AccessibilityContext";
import { appConfigVariables } from "../../../../appConfigVariables";

const labelStyles = "font-medium text-text";
const inputContainerStyle = "flex flex-col gap-2";

export default function AccessibilitySettings() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const { accessibility, updateAccessibility } = useAccessibility();
  const {
    highContrastMode,
    reduceAnimations,
    removeRoundEdges,
    increaseLetterSpacing,
    fontSizeMultiplier,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: Update accessibility settings
  }

  return (
    <div
      className="flex h-full flex-col overflow-y-auto rounded-2xl bg-primaryBg p-6"
      role="region"
      aria-labelledby="accessibility-heading"
      style={{
        transition: reduceAnimations ? "none" : "",
        letterSpacing: increaseLetterSpacing
          ? appConfigVariables.letterSpacing
          : "",
      }}
    >
      <h2
        id="accessibility-heading"
        className="mb-8 font-bold text-heading"
        aria-label="Accessibility Settings"
        style={{
          fontSize: `${fontSizeMap["3xl"]}px`,
          color: highContrastMode ? accessibilityTextColor : "",
        }}
      >
        Accessibility
      </h2>

      <form
        className="flex max-w-[600px] flex-1 flex-col gap-6 overflow-y-scroll px-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scrollbar"
        onSubmit={handleSubmit}
        aria-describedby="form-description"
      >
        <p id="form-description" className="sr-only">
          Customize accessibility settings for the application.
        </p>

        <div aria-live="polite" className="sr-only">
          {formStatus === "success" && "Accessibility settings updated"}
          {formStatus === "error" &&
            "Error updating accessibility settings, please try again."}
        </div>

        <div className={inputContainerStyle}>
          <label
            style={{
              fontSize: `${fontSizeMap.lg}px`,
            }}
            className={`${labelStyles}`}
            htmlFor="fontSize"
          >
            Text size multiplier
          </label>

          <div className="flex items-center gap-4">
            <select
              defaultValue={fontSizeMultiplier}
              id="fontSize"
              className={`w-full rounded-xl bg-secondary-200 p-3`}
              aria-label="Select text size multiplier"
              aria-describedby="font-size-description"
              style={{
                fontSize: `${fontSizeMap.base}px`,
                borderRadius: removeRoundEdges ? "0" : "",
              }}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                updateAccessibility({
                  fontSizeMultiplier: Number(
                    e.target.value,
                  ) as AccessibilityContextType["accessibility"]["fontSizeMultiplier"],
                })
              }
            >
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1">1x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
            </select>
            <p className="sr-only" id="font-size-description">
              Choose a multiplier to adjust the text size throughout the
              application.
            </p>
          </div>
        </div>

        <ToggleField
          title="Enhance visual contrast"
          label="High Contrast Mode"
          icon={<Moon size={20} />}
          checked={highContrastMode}
          onChange={() =>
            updateAccessibility({ highContrastMode: !highContrastMode })
          }
        />
        <ToggleField
          title="Minimize motion effects"
          label="Reduce animations"
          icon={<Type size={20} />}
          checked={reduceAnimations}
          onChange={() =>
            updateAccessibility({ reduceAnimations: !reduceAnimations })
          }
        />
        <ToggleField
          title="Simplify UI shapes"
          label="Remove round edges"
          icon={<Scan size={20} />}
          checked={removeRoundEdges}
          onChange={() =>
            updateAccessibility({ removeRoundEdges: !removeRoundEdges })
          }
        />
        <ToggleField
          title="Improve text readability"
          label="Increase letter spacing"
          icon={<Space size={20} />}
          checked={increaseLetterSpacing}
          onChange={() =>
            updateAccessibility({
              increaseLetterSpacing: !increaseLetterSpacing,
            })
          }
        />
      </form>
    </div>
  );
}
