import { AlertTriangle } from "lucide-react";
import Link from "@/shared-components/Link";
import useAccessibility from "@/stores/accessibility/useAccessibility";

export default function ErrorPage() {
  const { accessibility } = useAccessibility();
  const {
    removeRoundEdges,
    highContrastMode,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;

  return (
    <div
      className="flex h-full flex-col items-center justify-center rounded-2xl bg-primaryBg p-6"
      style={{
        borderRadius: removeRoundEdges ? "0" : "",
        color: highContrastMode ? accessibilityTextColor : "",
      }}
    >
      <AlertTriangle
        size={2 * fontSizeMap["3xl"]}
        className="mb-4 text-textWeak"
        style={{ color: highContrastMode ? accessibilityTextColor : "" }}
      />

      <h1
        style={{
          fontSize: `${fontSizeMap["3xl"]}px`,
          color: highContrastMode ? accessibilityTextColor : "",
        }}
        className="mb-2 font-bold text-heading"
      >
        404 - Page Not Found
      </h1>

      <p
        style={{
          fontSize: `${fontSizeMap.xl}px`,
          color: highContrastMode ? accessibilityTextColor : "",
        }}
        className="mb-6 text-textWeak"
      >
        Oops! The page you're looking for doesn't exist.
      </p>

      <Link
        to="/dashboard"
        className="rounded-full bg-secondaryBgWeak px-6 py-2 text-lg font-medium text-text transition-colors duration-200 hover:bg-secondaryBg active:bg-secondaryBgStrong"
        aria-label="Back to Dashboard"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
