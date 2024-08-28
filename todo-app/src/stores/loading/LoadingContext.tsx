import { createContext, useState } from "react";

/*
This loading queue allows non-unique IDs,
enabling multiple items to be added concurrently.
*/
export type LoadingContextType = {
  isLoading: boolean;
  addToLoadingQueue: (id: string) => void;
  removeFromLoadingQueue: (id: string) => void;
};

export const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined,
);

export function LoadingContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loadingQueue, setLoadingQueue] = useState<string[]>([]);

  /**
   * Enter none unique id of your choice.
   */
  function addToLoadingQueue(id: string) {
    setLoadingQueue((prev) => [...prev, id]);
  }

  function removeFromLoadingQueue(id: string) {
    setLoadingQueue((prev) => {
      const idFound = prev.indexOf(id); // first occurence of ID.
      // console.log("prev:\n", prev);

      if (idFound === -1) return prev;

      return [
        ...loadingQueue.slice(0, idFound),
        ...loadingQueue.slice(idFound + 1),
      ];
    });
  }

  // console.log("inside: context\n", loadingQueue);
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
