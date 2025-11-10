"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Type definition for the theme context
type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

// Create the React context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

// Provider component that wraps the app
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Initialize darkMode state from localStorage
  const [darkMode, setDarkMode] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
  );

  // Effect to apply the theme class and persist preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark"); // add "dark" class to <html>
      localStorage.setItem("theme", "dark");           // persist theme in localStorage
    } else {
      document.documentElement.classList.remove("dark"); // remove "dark" class
      localStorage.setItem("theme", "light");           // persist theme in localStorage
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access theme context safely
export const useDarkMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a ThemeProvider");
  }
  return context;
};
