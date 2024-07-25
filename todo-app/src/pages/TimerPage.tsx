import TimerContextProvider from "../stores/timer/TimerContextProvider";
import Button from "../components/shared/Button";
import { Minus, PauseIcon, PlayIcon, Plus } from "lucide-react";

import useFontSize from "../stores/accessibility/useFontSize";
import useTimer from "../stores/timer/useTimer";

export function TimerPageComponent() {
  const fontSizes = useFontSize();
  const { state } = useTimer();

  const { timerState } = state;

  let content = null;
  switch (timerState) {
    case "running":
      content = (
        <Button variant="constrast-icon-text">
          <PauseIcon />
          <span style={{ fontSize: fontSizes["base"] }}>Pause</span>
        </Button>
      );
      break;
    case "paused":
      content = (
        <Button variant="constrast-icon-text">
          <PlayIcon />
          <span>Start</span>
        </Button>
      );
      break;
    case "stopped":
      content = (
        <Button variant="constrast-icon-text">
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
                00:00
              </h2>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Button variant="icon">
              <Minus />
            </Button>
            <p className="text-medium" style={{ fontSize: fontSizes["2xl"] }}>
              30 mins
            </p>
            <Button variant="icon">
              <Plus />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2">
            {content}
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
