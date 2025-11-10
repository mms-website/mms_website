'use client';

import { useTranslations } from 'next-intl';
import DarkModeToggler from "./DarkModeToggler";
import LanguageToggler from "./LanguageToggler";
import { useEffect, useRef, useState } from "react";
import { Menu, Settings } from "lucide-react";

const Navbar = () => {
  const t = useTranslations('Navbar');

  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (!contactSection) return;
    const yOffset = -10;
    const y = contactSection.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    const updateCollapsed = () => {
      setCollapsed(window.innerWidth < 640);
    };

    updateCollapsed();
    window.addEventListener("resize", updateCollapsed);
    return () => window.removeEventListener("resize", updateCollapsed);
  }, []);

  // ✅ CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      // LEFT MENU
      if (
        openMenu &&
        !menuRef.current?.contains(target) &&
        !menuButtonRef.current?.contains(target)
      ) {
        setOpenMenu(false);
      }

      // RIGHT SETTINGS
      if (
        openSettings &&
        !settingsRef.current?.contains(target) &&
        !settingsButtonRef.current?.contains(target)
      ) {
        setOpenSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu, openSettings]);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center">
      <div
        className="
          flex justify-between items-center
          w-full max-w-[calc(100%-1.5rem)]
          mt-3 py-2 px-4 rounded-full shadow-2xl
          bg-(--bg-main-light) dark:bg-(--bg-high-dark)
          text-(--text-main-light) dark:text-(--text-main-dark)
        "
      >

        {/* LEFT SIDE */}
        {!collapsed ? (
          <ul className="flex gap-4">
            <li
              className="cursor-pointer relative after:block after:h-px after:w-full after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              onClick={scrollToTop}
            >
              {t('home')}
            </li>
            <li
              className="cursor-pointer relative after:block after:h-px after:w-full after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              onClick={scrollToContact}
            >
              {t('contact')}
            </li>
          </ul>
        ) : (
          <button
            ref={menuButtonRef}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setOpenMenu((prev) => !prev)}
          >
            <Menu />
          </button>
        )}

        {/* RIGHT SIDE */}
        {!collapsed ? (
          <div className="flex justify-between items-center gap-3">
            <hr className="w-0 h-7 border border-solid border-l border-(--text-main-light) dark:border-(--text-main-dark)" />
            <DarkModeToggler />
            <LanguageToggler />
          </div>
        ) : (
          <button
            ref={settingsButtonRef}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setOpenSettings((prev) => !prev)}
          >
            <Settings />
          </button>
        )}
      </div>

      {/* ✅ Dropdown LEFT when collapsed */}
      {collapsed && openMenu && (
        <div
          ref={menuRef}
          className="absolute top-16 left-3 bg-(--bg-main-light) dark:bg-(--bg-high-dark) rounded-xl shadow-xl p-2 flex flex-col"
        >
          <button
            onClick={scrollToTop}
            className="cursor-pointer after:block after:h-px after:w-full after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            {t('home')}
          </button>
          <button
            onClick={scrollToContact}
            className="cursor-pointer after:block after:h-px after:w-full after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            {t('contact')}
          </button>
        </div>
      )}

      {/* ✅ Dropdown RIGHT when collapsed */}
      {collapsed && openSettings && (
        <div
          ref={settingsRef}
          className="absolute top-16 right-3 bg-(--bg-main-light) dark:bg-(--bg-high-dark) rounded-xl shadow-xl p-1.5 flex flex-col gap-1.5"
        >
          <DarkModeToggler />
          <LanguageToggler />
        </div>
      )}
    </div>
  );
};

export default Navbar;
