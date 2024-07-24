import useRouter from "../../stores/useRouter";
import { ValidUrlPaths } from "../../stores/RouterContext";
import useFontSize from "../../stores/accessibility/useFontSize";

type LinkProps = {
  to: ValidUrlPaths;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  role?: string;
};

export default function Link({
  to,
  children,
  className,
  ariaLabel,
}: LinkProps) {
  const fontSizes = useFontSize();
  const { updatePath } = useRouter();

  return (
    <a
      href={to || "/"}
      onClick={(e) => {
        e.preventDefault();
        updatePath(to);
      }}
      className={className}
      aria-label={ariaLabel}
      style={{
        fontSize: `${fontSizes.base}px`,
      }}
    >
      {children}
    </a>
  );
}
