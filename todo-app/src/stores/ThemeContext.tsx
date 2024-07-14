import { createContext, useState, useEffect } from "react";

type ThemeContextType = {
  theme: "light" | "dark";
  themeController: "system" | "user";
  changeAppTheme: (
    theme: "light" | "dark" | null,
    controller: "system" | "user",
  ) => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

function getSystemTheme(): "light" | "dark" {
  if (typeof window !== "undefined" && window.matchMedia) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  }

  return "light";
}

export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"light" | "dark">(getSystemTheme);
  const [themeController, setThemeController] = useState<"system" | "user">(
    "system",
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (themeController === "system") {
        setTheme(getSystemTheme());
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  });

  function changeAppTheme(
    theme: ThemeContextType["theme"] | null,
    controller: ThemeContextType["themeController"],
  ) {
    if (theme && controller === "user") {
      setThemeController(controller);
      setTheme(theme);
      return;
    }

    setThemeController(controller);
    setTheme(getSystemTheme());
  }

  return (
    <ThemeContext.Provider value={{ theme, themeController, changeAppTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContextProvider };
