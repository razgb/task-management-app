import useRouter from "@/stores/router/useRouter";
import { ValidUrlPaths } from "@/stores/router/RouterContext";
import useAccessibility from "@/stores/accessibility/useAccessibility";

type LinkProps = {
  to: ValidUrlPaths; // type safe interface unlike href.
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  style?: React.CSSProperties;
  anchorProps?: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;
};

export default function Link({
  to,
  children,
  className,
  ariaLabel,
  style,
  ...anchorProps
}: LinkProps) {
  const { updatePath } = useRouter();
  const { accessibility } = useAccessibility();
  const {
    removeRoundEdges,
    reduceAnimations,
    highContrastMode,
    increaseLetterSpacing,
    accessibilityTextColor,
  } = accessibility;
  return (
    <a
      href={to || "/"}
      onClick={(e) => {
        e.preventDefault();
        updatePath(to);
      }}
      className={className}
      aria-label={ariaLabel}
      {...anchorProps}
      style={{
        ...style,
        borderRadius: removeRoundEdges ? "0" : "",
        transition: reduceAnimations ? "none" : "",
        letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
        color: highContrastMode ? accessibilityTextColor : "",
      }}
    >
      {children}
    </a>
  );
}
