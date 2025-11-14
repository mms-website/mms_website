"use client";

const Footer = () => {
  return (
    <footer className="w-full bg-(--bg-main-light) dark:bg-(--bg-high-dark) text-(--text-main-light) dark:text-(--text-main-dark) py-6 px-4 mt-10 shadow-inner rounded-t-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left section */}
        <div className="text-sm">
          © {new Date().getFullYear()} Missillac Marine Service. All rights reserved.
        </div>

        {/* Right section */}
        <div className="flex gap-2 text-sm items-center">
          <span>Design by</span>
          <a
            href="https://pelle-servan.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-blue-600 dark:text-blue-400 after:content-[''] after:block after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:scale-x-0 after:bg-current after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            Servan Pellé
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
