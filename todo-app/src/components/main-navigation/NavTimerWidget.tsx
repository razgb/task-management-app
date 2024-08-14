import useTimer from "../../stores/timer/useTimer";
import useRouter from "../../stores/router/useRouter";
import formatSecondsToDigitalFormat from "../../util/formatSecondsToDigitalFormat";
import Link from "../shared/Link";
import useAccessibility from "../../stores/accessibility/useAccessibility";

export default function NavTimerWidget() {
  const { state } = useTimer();
  const { timerValue, timerState } = state;
  const { path } = useRouter();
  const { accessibility } = useAccessibility();
  const { fontSizeMap } = accessibility;

  const renderingCondition =
    timerState === "active" && path !== "/timer" && path !== "/dashboard";

  return (
    <div
      className={`group relative ${
        renderingCondition
          ? "opacity-100"
          : "pointer-events-none invisible select-none opacity-0"
      } `}
    >
      <Link
        style={{ fontSize: fontSizeMap["2xl"] }}
        to="/timer"
        className={`rounded-lg p-2 font-medium text-textWeak transition-opacity hover:text-text`}
      >
        {formatSecondsToDigitalFormat(timerValue, "minute-second")}
      </Link>

      <p
        style={{ fontSize: fontSizeMap["sm"] }}
        className="absolute left-1/2 top-1 min-w-24 -translate-x-1/2 -translate-y-full transform rounded bg-secondary-300 px-1 py-0.5 text-center text-textWeak opacity-0 transition-opacity group-hover:opacity-100"
      >
        open timer
      </p>
    </div>
  );
}
