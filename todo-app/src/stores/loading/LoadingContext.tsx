import { createContext, useState } from "react";
import { ValidUrlPaths } from "../router/RouterContext";

/*
Pages have unique loading IDs matching routes,
ensuring concurrent loads maintain the longest
loading process.
*/
export type LoadingQueueType = ValidUrlPaths;
export type LoadingContextType = {
  isLoading: boolean;
  addToLoadingQueue: (id: LoadingQueueType) => void;
  removeFromLoadingQueue: (id: LoadingQueueType) => void;
};

export const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined,
);

export function LoadingContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loadingQueue, setLoadingQueue] = useState<LoadingQueueType[]>([]);
  function addToLoadingQueue(id: LoadingQueueType) {
    setLoadingQueue((prev) => [...prev, id]);
  }

  function removeFromLoadingQueue(id: LoadingQueueType) {
    setLoadingQueue((prev) => prev.filter((loadingId) => loadingId !== id));
  }

  const isLoading = loadingQueue.length > 0;

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        addToLoadingQueue,
        removeFromLoadingQueue,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
