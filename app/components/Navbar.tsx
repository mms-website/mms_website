'use client';

import { useTranslations } from 'next-intl';
import DarkModeToggler from "./DarkModeToggler";
import LanguageToggler from "./LanguageToggler";
import { useEffect, useRef, useState } from "react";
import { Menu, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

interface Section {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  advantages?: string[];
  image?: string;
}

const Navbar = () => {
  const t = useTranslations('Navbar');
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);

  const menuRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    const yOffset = -80;
    const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // Détecte la langue depuis l’URL
  const locale = pathname?.split("/")[1] || "en";

  // Charge dynamiquement le fichier JSON correspondant à la langue
  useEffect(() => {
    fetch(`/data/${locale}/transport.json`)
      .then(res => res.json())
      .then(data => setSections(data))
      .catch(() => setSections([]));
  }, [locale]);

  useEffect(() => {
    const updateCollapsed = () => setCollapsed(window.innerWidth < 640);
    updateCollapsed();
    window.addEventListener("resize", updateCollapsed);
    return () => window.removeEventListener("resize", updateCollapsed);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (openMenu && !menuRef.current?.contains(target) && !menuButtonRef.current?.contains(target)) setOpenMenu(false);
      if (openSettings && !settingsRef.current?.contains(target) && !settingsButtonRef.current?.contains(target)) setOpenSettings(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu, openSettings]);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center">
      <div className="flex justify-between items-center w-full max-w-[calc(100%-1.5rem)] mt-3 py-2 px-4 rounded-full shadow-2xl bg-white/00 backdrop-blur-md text-(--text-main-dark)">

        {/* LEFT SIDE */}
        {!collapsed ? (
          <ul className="flex gap-4">
            <li onClick={scrollToTop}>{t('home')}</li>
            <li onClick={() => scrollToSection('service')}>{t('service')}</li>

            {sections.map((section) => (
              <li
                key={section.id}
                className="cursor-pointer relative after:block after:h-px after:w-full after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                onClick={() => scrollToSection(section.id)}
              >
                {section.title}
              </li>
            ))}

            <hr className="w-0 h-6 border border-solid border-l border-(--text-main-dark)" />
            <li onClick={() => scrollToSection('contact')}>{t('contact')}</li>
            <li onClick={() => scrollToSection('openingHours')}>{t('openingHours')}</li>
          </ul>
        ) : (
          <button ref={menuButtonRef} className="flex items-center gap-2 cursor-pointer" onClick={() => setOpenMenu(prev => !prev)}>
            <Menu />
          </button>
        )}

        {/* RIGHT SIDE */}
        {!collapsed ? (
          <div className="flex justify-between items-center gap-3">
            <DarkModeToggler />
            <LanguageToggler />
          </div>
        ) : (
          <button ref={settingsButtonRef} className="flex items-center gap-2 cursor-pointer" onClick={() => setOpenSettings(prev => !prev)}>
            <Settings />
          </button>
        )}
      </div>

      {/* Dropdown LEFT when collapsed */}
      {collapsed && openMenu && (
        <div ref={menuRef} className="absolute bg-white/00 backdrop-blur-md top-16 left-3 rounded-xl shadow-xl p-2 flex flex-col text-(--text-main-dark)">
          <button onClick={scrollToTop}>{t('home')}</button>
          <button onClick={() => scrollToSection('service')}>{t('service')}</button>

          {sections.map((section) => (
            <button key={section.id} onClick={() => scrollToSection(section.id)}>
              {section.title}
            </button>
          ))}

          <button onClick={() => scrollToSection('contact')}>{t('contact')}</button>
          <button onClick={() => scrollToSection('openingHours')}>{t('openingHours')}</button>
        </div>
      )}

      {/* Dropdown RIGHT when collapsed */}
      {collapsed && openSettings && (
        <div ref={settingsRef} className="absolute top-16 right-3 bg-white/00 backdrop-blur-md rounded-xl shadow-xl p-1.5 flex flex-col gap-1.5">
          <DarkModeToggler />
          <LanguageToggler />
        </div>
      )}
    </div>
  );
};

export default Navbar;
