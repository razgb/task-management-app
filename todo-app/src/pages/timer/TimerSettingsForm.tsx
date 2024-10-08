import { useState } from "react";
import useTimer from "@/stores/timer/useTimer";
import Button from "@/shared-components/Button";
import { SettingsIcon } from "lucide-react";
import useAccessibility from "@/stores/accessibility/useAccessibility";

export default function TimerSettingsForm() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    removeRoundEdges,
    increaseLetterSpacing,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;

  const { state, dispatch } = useTimer();

  function handleSettingsChange(
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof state.timerSettings,
  ) {
    if (key === "autoSwitch") {
      const checkedState = e.target.checked;

      dispatch({
        type: "updateTimerSettings",
        payload: {
          timerSettings: {
            ...state.timerSettings,
            autoSwitch: checkedState,
          },
        },
      });

      return;
    }

    const parsedValue = parseInt(e.target.value, 10);
    if (isNaN(parsedValue) || parsedValue < 1) return; // guard
    const dispatchValue = Math.min(60, parsedValue);

    dispatch({
      type: "updateTimerSettings",
      payload: {
        timerSettings: {
          ...state.timerSettings,
          [key]: dispatchValue * 60,
        },
      },
    });
  }

  return (
    <div className={`absolute left-0 top-0 flex flex-col gap-4 p-3`}>
      <Button
        variant="ghost-icon"
        onClick={() => setSettingsOpen(!settingsOpen)}
      >
        <SettingsIcon size={fontSizeMap["3xl"]} />
      </Button>

      <form
        className={`mt-4 flex flex-col gap-4 ${
          settingsOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <div>
          <label
            htmlFor="workDuration"
            className="mb-1 block"
            style={{
              fontSize: fontSizeMap["base"],
              color: highContrastMode ? accessibilityTextColor : "",
              letterSpacing: increaseLetterSpacing ? "0.05rem" : "",
            }}
          >
            Work Duration (minutes):
          </label>
          <input
            type="number"
            id="workDuration"
            min="1"
            max="60"
            className="w-full rounded bg-secondary-300 p-2"
            style={{
              fontSize: fontSizeMap["base"],
              color: highContrastMode ? accessibilityTextColor : "",
              borderRadius: removeRoundEdges ? "0" : "",
            }}
            value={state.timerSettings.workDuration / 60}
            onChange={(e) => handleSettingsChange(e, "workDuration")}
          />
        </div>

        <div>
          <label
            htmlFor="breakDuration"
            className="mb-1 block"
            style={{
              fontSize: fontSizeMap["base"],
              color: highContrastMode ? accessibilityTextColor : "",
              letterSpacing: increaseLetterSpacing ? "0.05rem" : "",
            }}
          >
            Break Duration (minutes):
          </label>
          <input
            type="number"
            id="breakDuration"
            min="1"
            max="60"
            value={state.timerSettings.breakDuration / 60}
            className="w-full rounded bg-secondary-300 p-2"
            style={{
              fontSize: fontSizeMap["base"],
              color: highContrastMode ? accessibilityTextColor : "",
              borderRadius: removeRoundEdges ? "0" : "",
            }}
            onChange={(e) => handleSettingsChange(e, "breakDuration")}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="autoSwitch"
            checked={state.timerSettings.autoSwitch}
            className="h-4 w-4"
            onChange={(e) => handleSettingsChange(e, "autoSwitch")}
          />
          <label
            style={{
              fontSize: fontSizeMap["base"],
              color: highContrastMode ? accessibilityTextColor : "",
              letterSpacing: increaseLetterSpacing ? "0.05rem" : "",
            }}
            htmlFor="autoSwitch"
          >
            Auto switch to break
          </label>
        </div>
      </form>
    </div>
  );
}
