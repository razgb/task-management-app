import useFontSize from "../../stores/accessibility/useFontSize";
import Button from "../shared/Button";
import { MoveDiagonalIcon, PauseIcon, PlayIcon } from "lucide-react";
import Link from "../shared/Link";
import useTimer from "../../stores/timer/useTimer";

import formatSecondsToDigitalFormat from "../../util/formatSecondsToDigitalFormat";
import useAccessibility from "../../stores/accessibility/useAccessibility";
import useAccessibilityTextColor from "../../stores/accessibility/useAccessibilityTextColor";

export default function TimerWidget() {
  const fontSizes = useFontSize();
  const { accessibilityTextColor } = useAccessibilityTextColor();
  const { state, dispatch } = useTimer();
  const { timerState, timerValue } = state;
  const { accessibility } = useAccessibility();
  const {
    increaseLetterSpacing,
    highContrastMode,
    removeRoundEdges,
    reduceAnimations,
  } = accessibility;

  let content = null;
  switch (timerState) {
    case "active":
      content = (
        <>
          <Button
            onClick={() => dispatch({ payload: null, type: "reset" })}
            variant="text"
            style={{ fontSize: fontSizes["sm"] }}
          >
            reset
          </Button>
          <Button
            variant="contrast-icon-text"
            onClick={() => dispatch({ payload: null, type: "pause" })}
          >
            <PauseIcon size={fontSizes["xl"]} />
            <span style={{ fontSize: fontSizes["sm"] }}>Pause</span>
          </Button>
        </>
      );
      break;
    case "paused":
      content = (
        <>
          <Button
            onClick={() => dispatch({ payload: null, type: "reset" })}
            variant="text"
            style={{ fontSize: fontSizes["sm"] }}
          >
            reset
          </Button>
          <Button
            variant="contrast-icon-text"
            onClick={() => dispatch({ payload: null, type: "activate" })}
          >
            <PlayIcon size={fontSizes["xl"]} />
            <span style={{ fontSize: fontSizes["sm"] }}>Resume</span>
          </Button>
        </>
      );
      break;
    case "off":
      content = (
        <Button
          variant="contrast-icon-text"
          onClick={() => dispatch({ payload: null, type: "activate" })}
        >
          <PlayIcon size={fontSizes["xl"]} />
          <span style={{ fontSize: fontSizes["base"] }}>Start</span>
        </Button>
      );
      break;
  }

  return (
    <div
      style={{
        borderRadius: removeRoundEdges ? "0" : "",
        transition: reduceAnimations ? "none" : "",
        letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
      }}
      className="relative flex h-full flex-col items-center justify-center gap-2 rounded-2xl bg-primaryBg p-3"
    >
      <Link
        className="absolute right-2 top-2 self-end rounded-full bg-primaryBg p-2 transition-colors hover:bg-secondaryBgWeak"
        to="/timer"
      >
        <MoveDiagonalIcon size={fontSizes["xl"]} />
      </Link>

      <h2
        style={{
          fontSize: `${fontSizes["5xl"]}px`,
          color: highContrastMode ? accessibilityTextColor : "",
        }}
        className="font-semibold text-text"
      >
        {formatSecondsToDigitalFormat(timerValue, "minute-second")}
      </h2>

      <div className="flex items-center justify-center gap-2">{content}</div>
    </div>
  );
}
