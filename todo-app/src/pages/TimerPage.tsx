import Button from "../components/shared/Button";
import {
  Minus,
  //  Minus , Plus,
  PauseIcon,
  PlayIcon,
  Plus,
  TimerResetIcon,
} from "lucide-react";

import useFontSize from "../stores/accessibility/useFontSize";
import useTimer from "../stores/timer/useTimer";
import formatSecondsToDigitalFormat from "../util/formatSecondsToDigitalFormat";
import TimerSettingsForm from "../components/settings/timer-page/TimerSettingsForm";

export default function TimerPage() {
  const fontSizes = useFontSize();
  const { state, dispatch } = useTimer();
  const { timerState } = state;

  const activateCountDown = () => dispatch({ payload: null, type: "activate" });
  const resetCountDown = () => dispatch({ payload: null, type: "reset" });
  const pauseCountDown = () => dispatch({ payload: null, type: "pause" });

  let buttonState = null;
  if (timerState === "active") {
    buttonState = (
      <Button variant="constrast-icon-text" onClick={pauseCountDown}>
        <PauseIcon />
        <span style={{ fontSize: fontSizes["base"] }}>Pause</span>
      </Button>
    );
  } else if (timerState === "paused" || timerState === "off") {
    buttonState = (
      <Button variant="constrast-icon-text" onClick={activateCountDown}>
        <PlayIcon />
        <span>Start</span>
      </Button>
    );
  }

  return (
    <div className="h-full rounded-2xl bg-primaryBg p-3">
      <div className="relative flex h-full flex-col items-center gap-8 pt-[5%]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-48 w-48 rounded-full bg-secondary-300 md:h-80 md:w-80">
            <div className="flex h-full items-center justify-center">
              <h2
                style={{ fontSize: `${fontSizes["6xl"]}px` }}
                className="font-semibold text-headingSub"
              >
                {formatSecondsToDigitalFormat(
                  state.timerValue,
                  state.timerValue >= 3600
                    ? "hour-minute-second"
                    : "minute-second",
                )}
              </h2>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Button onClick={resetCountDown} variant="icon-text">
              <TimerResetIcon />
              <span>Reset</span>
            </Button>

            {buttonState}
          </div>

          <div className={`flex justify-center gap-2`}>
            <Button
              onClick={() => dispatch({ payload: -5 * 60, type: "addTime" })}
              variant="icon-text"
            >
              <Minus size={fontSizes["xl"]} />
              <span
                className="text-medium"
                style={{ fontSize: fontSizes["base"] }}
              >
                5 mins
              </span>
            </Button>

            <Button
              onClick={() => dispatch({ payload: -1 * 60, type: "addTime" })}
              variant="icon-text"
            >
              <Minus size={fontSizes["xl"]} />
              <span
                className="text-medium"
                style={{ fontSize: fontSizes["base"] }}
              >
                1 min
              </span>
            </Button>

            <Button
              onClick={() => dispatch({ payload: 1 * 60, type: "addTime" })}
              variant="icon-text"
            >
              <Plus size={fontSizes["xl"]} />
              <span
                className="text-medium"
                style={{ fontSize: fontSizes["base"] }}
              >
                1 min
              </span>
            </Button>

            <Button
              onClick={() => dispatch({ payload: 5 * 60, type: "addTime" })}
              variant="icon-text"
            >
              <Plus size={fontSizes["xl"]} />
              <span
                className="text-medium"
                style={{ fontSize: fontSizes["base"] }}
              >
                5 mins
              </span>
            </Button>
          </div>

          <Button
            onClick={() => dispatch({ payload: null, type: "toggleMode" })}
            style={{ fontSize: fontSizes["base"] }}
          >
            Change mode to: {state.timerMode === "work" ? "break" : "work"}
          </Button>
        </div>

        <TimerSettingsForm />
      </div>
    </div>
  );
}
