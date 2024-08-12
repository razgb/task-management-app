import { Moon, Scan, Space, Type } from "lucide-react";
import useAccessibility from "../../../stores/accessibility/useAccessibility";
import ToggleField from "../../../pages/settings/sub-settings/accessibility-settings/ToggleField";

export default function AccessibilitySection() {
  const { accessibility, updateAccessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    removeRoundEdges,
    fontSizeMap,
    accessibilityTextColor,
    reduceAnimations,
  } = accessibility;

  return (
    <div
      style={{
        borderRadius: removeRoundEdges ? 0 : "",
      }}
      className="col-start-1 col-end-1 row-start-3 -row-end-1 flex w-full flex-col gap-4 rounded-2xl bg-primaryBg p-6"
    >
      <h2
        className="font-medium text-text"
        style={{
          fontSize: fontSizeMap["2xl"],
          color: highContrastMode ? accessibilityTextColor : "",
          letterSpacing: increaseLetterSpacing ? "0.25em" : "",
        }}
      >
        Accessibility
      </h2>

      <div className="flex flex-col gap-2 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scrollbar">
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
      </div>
    </div>
  );
}
