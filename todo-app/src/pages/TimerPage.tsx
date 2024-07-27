import TimerContextProvider from "../stores/timer/TimerContextProvider";
import Button from "../components/shared/Button";
import {
  //  Minus , Plus,
  PauseIcon,
  PlayIcon,
  TimerResetIcon,
} from "lucide-react";

import useFontSize from "../stores/accessibility/useFontSize";
import useTimer from "../stores/timer/useTimer";

export function TimerPageComponent() {
  const fontSizes = useFontSize();
  const { state, dispatch } = useTimer();
  const { timerState } = state;

  const activateCountDown = () => dispatch({ payload: null, type: "activate" });
  const resetCountDown = () => dispatch({ payload: null, type: "reset" });
  const pauseCountDown = () => dispatch({ payload: null, type: "pause" });

  let buttonState = null;
  switch (timerState) {
    case "active":
      buttonState = (
        <Button variant="constrast-icon-text" onClick={pauseCountDown}>
          <PauseIcon />
          <span style={{ fontSize: fontSizes["base"] }}>Pause</span>
        </Button>
      );
      break;
    case "paused":
      buttonState = (
        <Button variant="constrast-icon-text" onClick={activateCountDown}>
          <PlayIcon />
          <span>Start</span>
        </Button>
      );
      break;
  }

  return (
    <div className="h-full rounded-2xl bg-primaryBg p-3">
      <div className="flex h-full flex-col items-center gap-8">
        <div className="flex flex-col gap-4 px-3 py-6">
          {/* ^ this px-3 words but since the h and w of the rounded display is constant. Design breaks. */}
          <div className="h-48 w-48 rounded-full bg-secondary-100 md:h-72 md:w-72">
            <div className="flex h-full items-center justify-center">
              <h2
                style={{ fontSize: `${fontSizes["6xl"]}px` }}
                className="font-semibold text-headingSub"
              >
                {formatSecondsToDigitalFormat(state.timerValue)}
              </h2>
            </div>
          </div>

          {/* <div
            className={`flex items-center justify-center gap-2 ${
              timerState == "active" ? "opacity-0" : ""
            }`}
          >
            <Button variant="icon">
              <Minus />
            </Button>
            <p className="text-medium" style={{ fontSize: fontSizes["2xl"] }}>
              30 mins
            </p>
            <Button variant="icon">
              <Plus />
            </Button>
          </div> */}

          <div className="flex items-center justify-center gap-2">
            <Button onClick={resetCountDown} variant="icon-text">
              <TimerResetIcon />
              <span>Reset</span>
            </Button>

            {buttonState}
          </div>
        </div>

        <div className="w-full flex-1 flex-shrink-0 rounded-2xl bg-secondary-200 p-6">
          <h2 className="font-semibold" style={{ fontSize: fontSizes["xl"] }}>
            Timer settings
          </h2>
        </div>
      </div>
    </div>
  );
}

export default function TimerPage() {
  return (
    <TimerContextProvider>
      <TimerPageComponent />
    </TimerContextProvider>
  );
}

function formatSecondsToDigitalFormat(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}
