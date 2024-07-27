import useFontSize from "../../stores/accessibility/useFontSize";
import Button from "../shared/Button";
import { MoveDiagonalIcon, PauseIcon, PlayIcon } from "lucide-react";
import Link from "../shared/Link";
import useTimer from "../../stores/timer/useTimer";

import formatSecondsToDigitalFormat from "../../util/formatSecondsToDigitalFormat";

export default function TimerWidget() {
  const fontSizes = useFontSize();
  const { state, dispatch } = useTimer();
  const { timerState, timerValue } = state;

  let content = null;
  switch (timerState) {
    case "active":
      content = (
        <Button
          variant="constrast-icon-text"
          onClick={() => dispatch({ payload: null, type: "pause" })}
        >
          <PauseIcon size={fontSizes["xl"]} />
          <span style={{ fontSize: fontSizes["sm"] }}>Pause</span>
        </Button>
      );
      break;
    case "paused":
      content = (
        <Button
          variant="constrast-icon-text"
          onClick={() => dispatch({ payload: null, type: "activate" })}
        >
          <PlayIcon size={fontSizes["xl"]} />
          <span style={{ fontSize: fontSizes["sm"] }}>Resume</span>
        </Button>
      );
      break;
    case "stopped":
      content = (
        <Button
          variant="constrast-icon-text"
          onClick={() => dispatch({ payload: null, type: "activate" })}
        >
          <PlayIcon size={fontSizes["xl"]} />
          <span style={{ fontSize: fontSizes["base"] }}>Start</span>
        </Button>
      );
      break;
  }

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-2 rounded-2xl bg-primaryBg p-3">
      <Link
        className="absolute right-2 top-2 self-end rounded-full bg-primaryBg p-2 transition-colors hover:bg-secondaryBgWeak"
        to="/timer"
      >
        <MoveDiagonalIcon size={fontSizes["xl"]} />
      </Link>

      <h2
        style={{ fontSize: `${fontSizes["5xl"]}px` }}
        className="font-semibold text-text"
      >
        {formatSecondsToDigitalFormat(timerValue)}
      </h2>

      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={() => dispatch({ payload: null, type: "reset" })}
          variant="text"
          style={{ fontSize: fontSizes["sm"] }}
        >
          reset
        </Button>

        {content}
      </div>
    </div>
  );
}
