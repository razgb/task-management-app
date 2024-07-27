import useRouter from "../../stores/useRouter";
import { ValidUrlPaths } from "../../stores/RouterContext";

type LinkProps = {
  to: ValidUrlPaths;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  style?: React.CSSProperties;
};

export default function Link({
  to,
  children,
  className,
  ariaLabel,
  style,
}: LinkProps) {
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
        ...style,
      }}
    >
      {children}
    </a>
  );
}
