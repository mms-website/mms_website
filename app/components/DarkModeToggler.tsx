"use client";

import { useDarkMode } from "@/app/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const DarkModeToggler = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <button
      // switch the theme by flipping the boolean state
      onClick={() => setDarkMode(!darkMode)}
      className="inline-grid grid-cols-2 rounded-full p-0.5 bg-white/10 text-gray-400"
      aria-label="Toggle dark mode"
      type="button"
    >
      {/* Sun icon represents light mode */}
      <span className="rounded-full p-0.5 cursor-pointer transition">
        <Sun className="w-6 h-6 rounded-full p-1 dark:border" />
      </span>

      {/* Moon icon represents dark mode */}
      <span className="rounded-full p-0.5 cursor-pointer transition">
        <Moon className="w-6 h-6 rounded-full p-1 border dark:border-0" />
      </span>
    </button>
  );
};

export default DarkModeToggler;
