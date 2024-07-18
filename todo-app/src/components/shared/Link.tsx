import useRouter from "../../stores/useRouter";
import { ValidUrlPaths } from "../../stores/RouterContext";

type LinkProps = {
  to: ValidUrlPaths;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

export default function Link({
  to,
  children,
  className,
  ariaLabel,
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
    >
      {children}
    </a>
  );
}
