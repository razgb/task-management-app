import useFontSize from "../../stores/accessibility/useFontSize";
import useTimer from "../../stores/timer/useTimer";
import useRouter from "../../stores/useRouter";
import formatSecondsToDigitalFormat from "../../util/formatSecondsToDigitalFormat";
import Link from "../shared/Link";

export default function NavTimerWidget() {
  const { state } = useTimer();
  const { timerValue, timerState } = state;
  const { path } = useRouter();
  const fontSizes = useFontSize();

  const renderingCondition =
    timerState === "active" && path !== "/timer" && path !== "/dashboard";

  return (
    <div className="group relative">
      <Link
        style={{ fontSize: fontSizes["2xl"] }}
        to="/timer"
        className={`rounded-lg p-2 font-medium text-textWeak transition-opacity hover:text-text ${
          renderingCondition ? "opacity-100" : "opacity-0"
        }`}
      >
        {formatSecondsToDigitalFormat(timerValue)}
      </Link>

      <p
        style={{ fontSize: fontSizes["sm"] }}
        className="absolute left-1/2 top-1 min-w-24 -translate-x-1/2 -translate-y-full transform rounded bg-secondary-300 px-1 py-0.5 text-center text-textWeak opacity-0 transition-opacity group-hover:opacity-100"
      >
        open timer
      </p>
    </div>
  );
}
