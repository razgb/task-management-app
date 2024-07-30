import { useContext } from "react";
import { ThemeContext } from "./ThemeContext.tsx";

export default function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return context;
}
