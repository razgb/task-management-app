import { createContext, ReactNode, useEffect, useState } from "react";

export type ValidUrlPaths =
  | "/error"
  | "/login"
  | "/logout"
  | "/signup"
  | "/dashboard"
  | "/tasks"
  | "/settings"
  | "/settings/tasks"
  | "/settings/accessibility"
  | "/settings/account-management"
  | "/settings/frequently-asked-questions"
  | "/timer"
  | "/task-creator"
  | "/habit-tracker";

export type RouterContextType = {
  path: string; // on page load, path could be anything.
  updatePath: (path: string | ValidUrlPaths) => void;
};

/*
 If there is no provider around the subscribing component then
 the value of the useContext hook will result in undefined.

 So this value here is the representation of the value of the provider.
 */
const RouterContext = createContext<RouterContextType | undefined>(undefined);

function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(window.location.pathname);

  const updatePath = (newPath: string | ValidUrlPaths) => {
    if (!isValidUrlPath(newPath)) return;

    // absolute
    if (newPath[0] === "/") {
      setPath(newPath);
      window.history.pushState(null, "", newPath);
    }
    // relative
    else if (new RegExp("^[a-zA-Z]+").test(newPath[0])) {
      const updatedPath = `${path}/${newPath}`;
      setPath(updatedPath);
      window.history.pushState(null, "", updatedPath);
    }
  };

  const value: RouterContextType = {
    path,
    updatePath,
  };

  useEffect(() => {
    window.addEventListener("popstate", () => {
      const currentPath = window.location.pathname;
      if (currentPath === path) return;

      setPath(currentPath);
    });

    return () => {
      window.removeEventListener("popstate", () => {});
    };
  }, [path]);

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

export { RouterProvider, RouterContext };

const isValidUrlPath = (url: string): url is ValidUrlPaths => {
  const validPaths: ValidUrlPaths[] = [
    "/error",
    "/login",
    "/logout",
    "/signup",
    "/dashboard",
    "/tasks",
    "/settings",
    "/settings/tasks",
    "/settings/accessibility",
    "/settings/account-management",
    "/settings/frequently-asked-questions",
    "/timer",
    "/task-creator",
    "/habit-tracker",
  ];

  if (new RegExp("^/tasks/[a-zA-Z0-9]+$").test(url)) return true; // allows any alphanumeric value after "/task/"

  const result = validPaths.some((validPath) => {
    return validPath.includes(url);
  });

  return result;
};
