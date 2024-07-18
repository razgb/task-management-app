import { ValidUrlPaths } from "../../stores/RouterContext";
import useRouter from "../../stores/useRouter";

type MenuButtonProps = {
  to: ValidUrlPaths;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "default" | "contrast";
};

export default function MenuButton({
  to,
  children,
  icon,
  variant = "default",
}: MenuButtonProps) {
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
        " bg-mainButtonBg hover:bg-mainButtonBgHover active:bg-mainButtonBgActive text-secondary-100";
      break;
  }

  return (
    <a
      className={`flex w-full cursor-pointer select-none items-center gap-2 rounded-3xl px-4 py-2 text-lg font-medium ${buttonBgStyles}`}
      onClick={() => validPath && updatePath(to)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          validPath && updatePath(to);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Navigate to ${children} page.`}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </a>
  );
}
