import { ValidUrlPaths } from "../../stores/RouterContext";
import useRouter from "../../stores/useRouter";

type MenuButtonProps = {
  to: ValidUrlPaths;
  children: React.ReactNode;
  icon?: React.ReactNode;
};

export default function MenuButton({ to, children, icon }: MenuButtonProps) {
  const { updatePath } = useRouter();

  const validPath = to !== null;

  return (
    <a
      className="flex w-full cursor-pointer select-none items-center gap-2 rounded-3xl bg-btnBg px-4 py-2 text-lg hover:bg-btnHover active:bg-btnActive"
      onClick={() => validPath && updatePath(to)}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </a>
  );
}
