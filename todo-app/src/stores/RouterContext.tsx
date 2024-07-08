import { createContext, ReactNode, useState } from "react";

type ValidUrlPaths = "/" | "tasks" | "dashboard";

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

  function updatePath(path: ValidUrlPaths) {
    setPath(path);
  }

  const value: RouterContextType = {
    path,
    updatePath,
  };

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

export { RouterProvider, RouterContext };
