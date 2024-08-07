import { ValidUrlPaths } from "../../stores/router/RouterContext";
import useAccessibility from "../../stores/accessibility/useAccessibility";
import useRouter from "../../stores/router/useRouter";

type MenuButtonProps = {
  to: ValidUrlPaths;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "default" | "contrast";
  menuState: boolean;
};

export default function MenuButton({
  to,
  children,
  icon,
  variant = "default",
  menuState,
}: MenuButtonProps) {
  const { accessibility } = useAccessibility();
  const {
    removeRoundEdges,
    reduceAnimations,
    highContrastMode,
    increaseLetterSpacing,
    fontSizeMap,
    accessibilityTextColor,
    reverseAccessibilityTextColor,
  } = accessibility;

  const { updatePath } = useRouter();
  const validPath = to !== null;

  let buttonBgStyles = "";
  switch (variant) {
    case "default":
      buttonBgStyles =
        " text-text bg-btnBg hover:bg-btnHover active:bg-btnActive";
      break;
    case "contrast":
      buttonBgStyles =
        " bg-mainButtonBg hover:bg-mainButtonBgHover active:bg-mainButtonBgActive text-textContrast";
      break;
  }

  return (
    <a
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (validPath) {
          updatePath(to);
        }
      }}
      href={validPath ? to : undefined}
      style={{
        fontSize: `${fontSizeMap.lg}px`,
        borderRadius: removeRoundEdges ? "0" : "",
        transition: reduceAnimations ? "none" : "",
        letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
        color: highContrastMode
          ? variant === "default"
            ? accessibilityTextColor
            : reverseAccessibilityTextColor
          : "",
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          validPath && updatePath(to);
        }
      }}
      tabIndex={0}
      aria-label={`Navigate to ${children} page inside app.`}
      className={`flex cursor-pointer select-none justify-start ${menuState ? "gap-2 self-stretch rounded-full px-4 py-3" : "rounded-full p-4"} font-medium ${buttonBgStyles} transition-all duration-150`}
    >
      {icon && <span aria-hidden="true">{icon}</span>}

      <span
        className={`${menuState ? "visible opacity-100" : "hidden"} transition-all duration-150`}
        style={{ fontSize: `${fontSizeMap.base}px` }}
      >
        {children}
      </span>
    </a>
  );
}
