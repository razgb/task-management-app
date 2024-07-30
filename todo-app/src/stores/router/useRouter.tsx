import { useContext } from "react";
import { RouterContext } from "./RouterContext";

export default function useRouter() {
  const routerContext = useContext(RouterContext);
  if (routerContext == undefined) {
    throw new Error(
      "Please wrap RouterProvider Context provider around the component first to use.",
    );
  }

  const { path, updatePath } = routerContext;
  return { path, updatePath };
}
