import { createContext, useState } from "react";

type ThemeContextType = {
  theme: "light" | "dark";
  changeAppTheme: (theme: "light" | "dark") => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  function changeAppTheme(theme: ThemeContextType["theme"]) {
    setTheme((prevTheme) => {
      if (theme !== prevTheme) return theme;
      return prevTheme;
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, changeAppTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContextProvider };
