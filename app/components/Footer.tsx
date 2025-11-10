"use client";

const Footer = () => {
  return (
    <footer className="w-full bg-(--bg-main-light) dark:bg-(--bg-high-dark) text-(--text-main-light) dark:text-(--text-main-dark) py-6 px-4 mt-10 shadow-inner rounded-t-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left section */}
        <div className="text-sm">
          © {new Date().getFullYear()} TOBEREPLACE. All rights reserved.
        </div>

        {/* Right section */}
        <div className="flex gap-4 text-sm">

        </div>
      </div>
    </footer>
  );
};

export default Footer;
