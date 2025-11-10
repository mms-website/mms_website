"use client";

import { ThemeProvider } from "@/app/context/ThemeContext";

/* --- Providers component --- */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
        <ThemeProvider>
          {children}
        </ThemeProvider>
  );
}
