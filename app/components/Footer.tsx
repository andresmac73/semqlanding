"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage, Language } from "../context/LanguageProvider";

const Footer = () => {
  const { lang } = useLanguage();

  const t = {
    es: {
      about: "About",
      section1: "Nuestra Historia",
      section2: "Equipo",
      section3: "Misión",
      section4: "Valores",
      copyright: "© 2025 SEMQ. Todos los derechos reservados.",
    },
    en: {
      about: "About",
      section1: "Our Story",
      section2: "Team",
      section3: "Mission",
      section4: "Values",
      copyright: "© 2025 SEMQ. All rights reserved.",
    },
    pt: {
      about: "Sobre",
      section1: "Nossa História",
      section2: "Equipe",
      section3: "Missão",
      section4: "Valores",
      copyright: "© 2025 SEMQ. Todos os direitos reservados.",
    },
  };

  return (
    <footer
      className="bg-white p-4 flex flex-col items-center text-[#365aa6] border-t border-border"
      role="contentinfo"
      aria-label="Pie de página principal"
    >
      {/* Top Row: Logo, Line, Sections, Social Icons */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-screen-lg mb-4 gap-4">
        {/* Left Logo */}
        <div className="flex items-center">
          <Image
            src="/semq.png"
            alt="SEMQ Logo en el pie de página"
            width={100}
            height={40}
          />
        </div>

        {/* Line */}
        <div className="flex-grow mx-4 hidden md:block">
          <div className="border-t-2 border-border" />
        </div>

        {/* Sections */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="relative group">
            <button className="text-[#365aa6] hover:text-[#2a4785] transition-colors font-semibold">
              {t[lang].about}
            </button>
            <ul className="absolute bottom-full left-0 mb-2 hidden group-hover:flex flex-col bg-white text-[#365aa6] rounded-lg shadow-lg border border-border min-w-[180px] z-50">
              <li>
                <Link
                  href="#section1"
                  className="block px-4 py-2 hover:bg-[#365aa6] hover:text-white cursor-pointer rounded-t-lg transition"
                >
                  {t[lang].section1}
                </Link>
              </li>
              <li>
                <Link
                  href="#section2"
                  className="block px-4 py-2 hover:bg-[#365aa6] hover:text-white cursor-pointer transition"
                >
                  {t[lang].section2}
                </Link>
              </li>
              <li>
                <Link
                  href="#section3"
                  className="block px-4 py-2 hover:bg-[#365aa6] hover:text-white cursor-pointer transition"
                >
                  {t[lang].section3}
                </Link>
              </li>
              <li>
                <Link
                  href="#section4"
                  className="block px-4 py-2 hover:bg-[#365aa6] hover:text-white cursor-pointer rounded-b-lg transition"
                >
                  {t[lang].section4}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-4">
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
        </div>
      </div>

      {/* Separator for mobile */}
      <div className="border-t-2 border-border w-full max-w-screen-lg mb-4 md:hidden"></div>

      {/* Mindustries Logo - Centered below the line */}
      <div className="flex justify-center mb-4">
        <Image
          src="/logomindustries.png"
          alt="Mindustries Logo"
          width={150}
          height={50}
          className="hover:opacity-80 transition-opacity"
        />
      </div>

      {/* Bottom Row: Copyright */}
      <div className="text-center">
        <p className="text-sm text-[#365aa6]/80">{t[lang].copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
