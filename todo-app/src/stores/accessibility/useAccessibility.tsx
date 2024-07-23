import { useContext } from "react";
import { AccessibilityContext } from "./AccessibilityContext";

export default function useAccessibility() {
  const context = useContext(AccessibilityContext);

  if (context === null) {
    throw new Error(
      "useAccessibility must be used within a AccessibilityProvider context.",
    );
  }

  return context;
}
