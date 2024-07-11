import { createContext, ReactNode, useState } from "react";

export type ValidUrlPaths = "/" | "/tasks" | "/dashboard";

interface RouterContextType {
  path: string; // on page load, path could be anything.
  updatePath: (path: ValidUrlPaths) => void;
}

/*
 If there is no provider around the subscribing component then 
 the value of the useContext hook will result in undefined. 

 So this value here is the representation of the value of the provider. 
 */
const RouterContext = createContext<RouterContextType | undefined>(undefined);

function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(window.location.pathname);

  /**
   * Updates url and path state in 2 ways:
   * 1. Absolute path. '/' + path name must be given.
   * 2. Relative path that adds on to current path. Only give the path name.
   *
   * @param newPath string of valid urls from type ValidUrlPaths.
   */
  const updatePath = (newPath: ValidUrlPaths) => {
    if (newPath[0] === "/") {
      setPath(newPath);
      window.history.pushState(null, "", newPath);
    } else {
      const updatedPath = `/${path}/${newPath}`;
      setPath(updatedPath);
      window.history.pushState(null, "", updatedPath);
    }
  };

  const value: RouterContextType = {
    path,
    updatePath,
  };

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

export { RouterProvider, RouterContext };
