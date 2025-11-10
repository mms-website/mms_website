"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";

export default function LanguageToggler() {
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [currentLocale, setCurrentLocale] = useState("en");
  const [languages, setLanguages] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  // Détecte la langue dans l’URL
  useEffect(() => {
    const locale = pathname?.split("/")[1] || "en";
    setCurrentLocale(locale);
  }, [pathname]);

  // Récupère la liste des fichiers JSON
  useEffect(() => {
    fetch("/api/languages")
      .then((res) => res.json())
      .then((data) => setLanguages(data))
      .catch(() => setLanguages(["en", "fr"]));
  }, []);

  // Ferme le menu si clic en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"), { scroll: false });
    router.refresh();
    setCurrentLocale(newLocale);
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bouton */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex cursor-pointer items-center gap-1 px-2 py-1 rounded-full bg-gray-950/5 text-gray-600 dark:bg-white/10 dark:text-gray-400"
      >
        <Globe className="w-4 h-4" />
        <span>{currentLocale}</span>
      </button>

      {/* Menu déroulant */}
      {open && (
        <div className="absolute right-0 mt-3 rounded-md shadow bg-[#EFEFF0] p-0.75 text-gray-600 dark:bg-[#353535] dark:text-gray-400 border z-10">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => updateLocale(lang)}
              className={`block px-2 py-1 text-sm rounded-md w-full text-left cursor-pointer relative after:block after:h-px after:w-full after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                lang === currentLocale ? "font-bold" : ""
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
