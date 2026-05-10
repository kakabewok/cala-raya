"use client";

import { useState, useEffect, useCallback } from "react";
import { CONTACT_PERSON, navLinks } from "@/data/data";
import Image from "next/image";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeSidebar = useCallback(() => setIsOpen(false), []);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ESC key to close sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeSidebar();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeSidebar]);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position and lock body
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";

      return () => {
        // Restore scroll position
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const handleLinkClick = () => closeSidebar();

  return (
    <>
      {/* Backdrop overlay — sits behind the nav (z-40 < z-50) */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
        onTouchEnd={(e) => {
          e.preventDefault();
          closeSidebar();
        }}
        aria-hidden="true"
      >
        {/* Dark semi-transparent background */}
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px]" />
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? "bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex justify-between items-center h-16 md:h-[72px]">
            {/* Logo */}
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2 flex-shrink-0"
            >
              <Image
                alt="Calaraya Logo"
                src="https://res.cloudinary.com/dk16ng09n/image/upload/v1766687461/personal/web-porto/ChatGPT_Image_Dec_26_2025_01_29_22_AM_os33rl.webp"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span className="text-[15px] font-semibold tracking-wide text-stone-800">
                Calaraya
              </span>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href === "#home") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="text-[13px] font-medium text-stone-500 hover:text-stone-900 transition-colors duration-200 tracking-wide"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center">
              <a
                href={`https://wa.me/${CONTACT_PERSON}?text=${encodeURIComponent(
                  "Halo, saya ingin bertanya tentang jasa pembuatan Undangan Digital/Website"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-stone-900 text-white text-[13px] font-medium rounded-lg hover:bg-stone-800 transition-colors duration-200 tracking-wide"
              >
                Konsultasi
              </a>
            </div>

            {/* Animated Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center text-stone-700 z-10"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                {/* Top bar */}
                <span
                  className={`block h-[1.5px] w-5 bg-current rounded-full transition-all duration-300 ease-in-out origin-center ${
                    isOpen
                      ? "translate-y-[7px] rotate-45"
                      : "translate-y-0 rotate-0"
                  }`}
                />
                {/* Middle bar */}
                <span
                  className={`block h-[1.5px] w-5 bg-current rounded-full transition-all duration-200 ease-in-out ${
                    isOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                  }`}
                />
                {/* Bottom bar */}
                <span
                  className={`block h-[1.5px] w-5 bg-current rounded-full transition-all duration-300 ease-in-out origin-center ${
                    isOpen
                      ? "-translate-y-[7px] -rotate-45"
                      : "translate-y-0 rotate-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu — slide down with opacity + translate */}
        <div
          className={`lg:hidden bg-white border-t border-stone-100 overflow-hidden transition-all duration-350 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
            isOpen
              ? "max-h-[calc(100vh-64px)] opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-1"
          }`}
        >
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4">
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link, i) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href === "#home") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                    handleLinkClick();
                  }}
                  className="py-3 px-4 text-[15px] font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-all duration-200 active:bg-stone-100"
                  style={{
                    transitionDelay: isOpen ? `${i * 30}ms` : "0ms",
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen
                      ? "translateY(0)"
                      : "translateY(-4px)",
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div
              className="mt-4 pt-4 border-t border-stone-100 transition-all duration-200"
              style={{
                transitionDelay: isOpen
                  ? `${navLinks.length * 30 + 30}ms`
                  : "0ms",
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(-4px)",
              }}
            >
              <a
                href={`https://wa.me/${CONTACT_PERSON}?text=${encodeURIComponent(
                  "Halo, saya ingin bertanya tentang jasa pembuatan Undangan Digital/Website"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="block text-center w-full px-5 py-3 bg-stone-900 text-white text-[15px] font-medium rounded-lg active:bg-stone-800 transition-colors"
              >
                Konsultasi Gratis
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

