"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage, Language } from "../context/LanguageProvider";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  const t = {
    es: {
      about: "About",
      section1: "Nuestra Historia",
      section2: "Equipo",
      section3: "Misión",
      section4: "Valores",
    },
    en: {
      about: "About",
      section1: "Our Story",
      section2: "Team",
      section3: "Mission",
      section4: "Values",
    },
    pt: {
      about: "Sobre",
      section1: "Nossa História",
      section2: "Equipe",
      section3: "Missão",
      section4: "Valores",
    },
  };

  const flagMap: Record<Language, string> = {
    es: "🇦🇷",
    en: "🇺🇸",
    pt: "🇧🇷",
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white text-[#365aa6] shadow-lg"
          : "bg-white text-[#365aa6]"
      } border-b border-border`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center mr-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/semq.png"
              alt="SEMQ Logo"
              width={120}
              height={40}
              className="cursor-pointer transition-all duration-300"
              priority
            />
          </Link>
        </div>

        {/* Menu Items - Desktop - About hacia la derecha */}
        <div className="hidden md:flex items-center space-x-8 flex-1 justify-end font-semibold text-base">
          <div className="relative">
            <button
              onClick={() => setAboutMenuOpen(!aboutMenuOpen)}
              onBlur={() => setTimeout(() => setAboutMenuOpen(false), 200)}
              className="flex items-center gap-1 cursor-pointer transition-colors duration-300 hover:text-[#2a4785]"
            >
              {t[lang].about}
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  aboutMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {aboutMenuOpen && (
              <ul className="absolute top-full right-0 mt-2 w-48 bg-white text-[#365aa6] rounded-lg shadow-lg border border-border z-50">
                <li>
                  <Link
                    href="#section1"
                    className="block px-4 py-2 hover:bg-[#365aa6] hover:text-white cursor-pointer rounded-t-lg transition"
                    onClick={() => setAboutMenuOpen(false)}
                  >
                    {t[lang].section1}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#section2"
                    className="block px-4 py-2 hover:bg-[#365aa6] hover:text-white cursor-pointer transition"
                    onClick={() => setAboutMenuOpen(false)}
                  >
                    {t[lang].section2}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#section3"
                    className="block px-4 py-2 hover:bg-[#365aa6] hover:text-white cursor-pointer transition"
                    onClick={() => setAboutMenuOpen(false)}
                  >
                    {t[lang].section3}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#section4"
                    className="block px-4 py-2 hover:bg-[#365aa6] hover:text-white cursor-pointer rounded-b-lg transition"
                    onClick={() => setAboutMenuOpen(false)}
                  >
                    {t[lang].section4}
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Redes sociales y Language Selector - Desktop */}
        <div className="hidden md:flex items-center space-x-4 ml-6">
          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#365aa6] hover:text-[#2a4785] transition-colors"
            aria-label="Instagram"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#365aa6] hover:text-[#2a4785] transition-colors"
            aria-label="LinkedIn"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <div className="relative">
            <button
              onClick={() => {
                const langs: Language[] = ["es", "en", "pt"];
                const currentIndex = langs.indexOf(lang);
                const nextIndex = (currentIndex + 1) % langs.length;
                setLang(langs[nextIndex]);
              }}
              className="flex items-center text-2xl hover:scale-110 transition"
            >
              {flagMap[lang]}
            </button>
          </div>
        </div>

        {/* Menu Hamburguesa */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Menu"
            className="p-2 hover:bg-gray-100 rounded transition"
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu desplegable para móvil */}
      {menuOpen && (
        <div className="md:hidden bg-white text-[#365aa6] border-t border-border">
          <ul className="space-y-4 py-4">
            <li>
              <button
                onClick={() => setAboutMenuOpen(!aboutMenuOpen)}
                className="block w-full text-center hover:text-[#2a4785] cursor-pointer transition-colors duration-300 py-2"
              >
                <span className="flex items-center justify-center gap-2">
                  {t[lang].about}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      aboutMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              {aboutMenuOpen && (
                <ul className="mt-2 space-y-2">
                  <li>
                    <Link
                      href="#section1"
                      className="block text-center hover:text-[#2a4785] cursor-pointer transition-colors duration-300 py-2"
                      onClick={toggleMenu}
                    >
                      {t[lang].section1}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#section2"
                      className="block text-center hover:text-[#2a4785] cursor-pointer transition-colors duration-300 py-2"
                      onClick={toggleMenu}
                    >
                      {t[lang].section2}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#section3"
                      className="block text-center hover:text-[#2a4785] cursor-pointer transition-colors duration-300 py-2"
                      onClick={toggleMenu}
                    >
                      {t[lang].section3}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#section4"
                      className="block text-center hover:text-[#2a4785] cursor-pointer transition-colors duration-300 py-2"
                      onClick={toggleMenu}
                    >
                      {t[lang].section4}
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          {/* Redes sociales móvil */}
          <div className="py-4 flex justify-center space-x-6 border-t border-border">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#365aa6] hover:text-[#2a4785] transition-colors"
              aria-label="Instagram"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#365aa6] hover:text-[#2a4785] transition-colors"
              aria-label="LinkedIn"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          {/* Selector de idioma móvil */}
          <div className="py-4 flex justify-center border-t border-border">
            <div className="flex space-x-4">
              {(["es", "en", "pt"] as Language[]).map((code) => (
                <button
                  key={code}
                  onClick={() => {
                    setLang(code);
                    setMenuOpen(false);
                  }}
                  className={`text-2xl hover:scale-110 transition ${
                    lang === code ? "scale-110" : ""
                  }`}
                >
                  {flagMap[code]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
