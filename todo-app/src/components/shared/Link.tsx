import useRouter from "../../stores/useRouter";
import { ValidUrlPaths } from "../../stores/RouterContext";

type LinkProps = {
  to: ValidUrlPaths;
  children: React.ReactNode;
};

export default function Link({ to, children }: LinkProps) {
  const { updatePath } = useRouter();

  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        updatePath(to);
      }}
    >
      {children}
    </a>
  );
}
