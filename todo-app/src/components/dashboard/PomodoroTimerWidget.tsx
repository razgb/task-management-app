import useFontSize from "../../stores/accessibility/useFontSize";
import Button from "../shared/Button";
import { MoveDiagonalIcon, PauseIcon, PlayIcon } from "lucide-react";
import Link from "../shared/Link";
import useTimer from "../../stores/timer/useTimer";

export default function PomodoroTimerWidget() {
  const fontSizes = useFontSize();
  const { timerState, timerSettings, updateTimerState, updateTimerSettings } =
    useTimer();

  let content = null;
  switch (timerState) {
    case "running":
      content = (
        <Button variant="icon">
          <PauseIcon />
        </Button>
      );
      break;
    case "paused":
      content = (
        <Button variant="icon">
          <PlayIcon />
        </Button>
      );
      break;
    case "stopped":
      content = (
        <Button variant="icon">
          <PlayIcon />
        </Button>
      );
      break;
  }

  return (
    <div className="relative flex h-full flex-col items-center justify-center rounded-2xl bg-primaryBg p-3">
      <Link
        className="absolute right-2 top-2 self-end rounded-full bg-primaryBg p-2 transition-colors hover:bg-secondaryBgWeak"
        to="/timer"
      >
        <MoveDiagonalIcon size={fontSizes["xl"]} />
      </Link>

      <h2
        style={{ fontSize: `${fontSizes["5xl"]}px` }}
        className="font-semibold text-headingSub"
      >
        00:00
      </h2>

      <div className="flex items-center justify-center gap-2">{content}</div>
    </div>
  );
}
