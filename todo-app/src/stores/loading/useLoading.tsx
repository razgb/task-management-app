import { useContext } from "react";
import { LoadingContext } from "./LoadingContext";

export const useLoading = () => {
  const loadingContext = useContext(LoadingContext);
  if (!loadingContext) {
    throw new Error(
      "useLoading hook must be used within LoadingContextProvider.",
    );
  }

  return loadingContext;
};
