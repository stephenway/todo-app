import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  dark: false,
  toggle: () => {},
});

export function ThemeProvider({ children }) {
  const initialDark = () => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      return storedTheme !== null ? storedTheme === "dark" : prefersDark;
    }
  };
  const [isDark, setIsDark] = useState(initialDark());

  useEffect(() => applyTheme(), [isDark]);

  const applyTheme = () => {
    const root = document.getElementsByTagName("html")[0];
    root.className = isDark ? "darkTheme" : "";
  };

  const toggle = () => {
    setIsDark(!isDark);
    localStorage.setItem("theme", isDark ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider
      value={{
        dark: isDark,
        toggle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
