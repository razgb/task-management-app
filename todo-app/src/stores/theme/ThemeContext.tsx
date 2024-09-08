import { createContext, useState, useEffect } from "react";

type ThemeContextType = {
  theme: "light" | "dark";
  themeController: "system" | "user";
  changeAppTheme: (
    theme: "light" | "dark" | null,
    controller: "system" | "user",
  ) => void;
};

type ThemeStateType = {
  theme: "light" | "dark";
  themeController: "system" | "user";
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

function setLocalStorageSettings(settings: ThemeStateType) {
  localStorage.setItem("theme", JSON.stringify(settings));
}

function getLocalStorageSettings() {
  const themeSettingsJSON = localStorage.getItem("theme");

  if (!themeSettingsJSON) return null;

  const themeSettings = JSON.parse(themeSettingsJSON);
  return themeSettings as {
    theme: ThemeContextType["theme"];
    themeController: ThemeContextType["themeController"];
  };
}

function getSystemTheme(): ThemeStateType {
  if (typeof window !== "undefined" && window.matchMedia) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return { theme: "dark", themeController: "system" };
    }

    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      return { theme: "light", themeController: "system" };
    }
  }

  // Default case
  return { theme: "light", themeController: "user" };
}

function initThemeSettings(): ThemeStateType {
  const localStorageResult = getLocalStorageSettings();
  if (localStorageResult) {
    return localStorageResult;
  }

  if (typeof window !== "undefined" && window.matchMedia) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return { theme: "dark", themeController: "system" };
    }

    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      return { theme: "light", themeController: "system" };
    }
  }

  // Default case
  return { theme: "light", themeController: "user" };
}

export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<ThemeStateType>(initThemeSettings());

  function changeAppTheme(
    theme: ThemeContextType["theme"] | null,
    controller: ThemeContextType["themeController"],
  ) {
    if (theme && controller === "user") {
      const newSettings: ThemeStateType = {
        theme: theme,
        themeController: controller,
      };

      setSettings(newSettings);
      setLocalStorageSettings(newSettings);
      return;
    }

    const newSettings = getSystemTheme();

    setSettings(newSettings);
    setLocalStorageSettings(newSettings);
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      // only auto change theme if system is the controller
      if (settings.themeController === "system") {
        setSettings(getSystemTheme());
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [settings.themeController, settings.theme]);

  return (
    <ThemeContext.Provider value={{ ...settings, changeAppTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContextProvider };
