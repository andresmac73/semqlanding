"use client";

import { useLanguage } from "../context/LanguageProvider";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

const titles = {
  es: "The Next Standard For AI Vector Compression",
  en: "The Next Standard For AI Vector Compression",
  pt: "The Next Standard For AI Vector Compression",
};

const subtitles = {
  es: "Compress embeddings up to 6× while preserving semantic structure.Directional-preserving. Symbolic. Multimodal.",
  en: "Compress embeddings up to 6× while preserving semantic structure.Directional-preserving. Symbolic. Multimodal.",
  pt: "Compress embeddings up to 6× while preserving semantic structure.Directional-preserving. Symbolic. Multimodal.",
};

export default function Hero() {
  const { lang } = useLanguage();
  const title = useMemo(() => titles[lang], [lang]);
  const subtitle = useMemo(() => subtitles[lang], [lang]);

  // Typing effect para el título
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  const [showPatent, setShowPatent] = useState(false);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let cursorInterval: NodeJS.Timeout;
    setTyped("");
    setShowCursor(true);
    setTypingComplete(false);
    setShowPatent(false);
    let i = 0;
    function type() {
      setTyped(title.slice(0, i));
      if (i <= title.length) {
        timeout = setTimeout(type, 90);
        i++;
      } else {
        // Cuando termine el typing, marcar como completo
        setTypingComplete(true);
        // Después de un pequeño delay, mostrar la imagen patent
        setTimeout(() => {
          setShowPatent(true);
        }, 300);
      }
    }
    type();
    cursorInterval = setInterval(() => setShowCursor((c) => !c), 500);
    return () => {
      clearTimeout(timeout);
      clearInterval(cursorInterval);
    };
  }, [title]);

  return (
    <section
      id="inicio"
      className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-0 overflow-hidden"
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay con degradado desde abajo (transparente) hacia arriba (blanco intenso) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 15%, rgba(255, 255, 255, 0.5) 35%, rgba(255, 255, 255, 0.8) 55%, rgba(255, 255, 255, 0.95) 75%, rgba(255, 255, 255, 1) 85%, rgba(255, 255, 255, 1) 100%)",
        }}
      />

      {/* Contenedor del texto centrado */}
      <div className="relative z-10 container mx-auto flex items-center justify-center h-full">
        <div className="text-center px-4 max-w-4xl relative">
          {/* Patent image - aparece arriba del texto, girada 45 grados hacia arriba, sobre "AI" */}
          {showPatent && (
            <img
              src="/patent.png"
              alt="Patent"
              className="absolute opacity-0"
              style={{
                animation: "fadeInLeft 1.5s ease-out forwards",
                top: "-110px",
                left: "88%",
                transform: "rotate(-45deg)",
                height: "auto",
                width: "auto",
                maxWidth: "none",
                objectFit: "contain",
                zIndex: 1,
              }}
            />
          )}
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#365aa6] mb-4 min-h-[3.5rem] flex items-center justify-center relative"
            style={{
              textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)",
            }}
          >
            <span style={{ whiteSpace: "pre-wrap", display: "inline", position: "relative" }}>
              {typed}
              <span
                className="inline-block align-middle"
                style={{
                  width: "0.5ch",
                  height: "1.2em",
                  borderLeft: showCursor && !typingComplete
                    ? "3px solid #365aa6"
                    : "3px solid transparent",
                  marginLeft: "4px",
                  transition: "border-color 0.2s",
                  verticalAlign: "text-bottom",
                }}
              />
            </span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="flex justify-center">
            <Link
              href="https://calendly.com/andresmacallister/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button 
                className="px-8 py-4 font-bold text-white text-base md:text-lg transition-all duration-300 relative overflow-hidden"
                style={{
                  borderRadius: '9999px',
                  background: 'linear-gradient(145deg, #6a90e7 0%, #5a80d7 20%, #4a70c7 40%, #365aa6 60%, #2a4785 80%, #1e3564 100%)',
                  boxShadow: '0 4px 20px rgba(54, 90, 166, 0.5), inset 0 2px 5px rgba(255, 255, 255, 0.35), inset 0 -3px 8px rgba(0, 0, 0, 0.25)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(145deg, #7aa0f7 0%, #6a90e7 20%, #5a80d7 40%, #4a70c7 60%, #365aa6 80%, #2a4785 100%)';
                  e.currentTarget.style.boxShadow = '0 6px 30px rgba(54, 90, 166, 0.7), inset 0 3px 6px rgba(255, 255, 255, 0.45), inset 0 -3px 8px rgba(0, 0, 0, 0.25)';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(145deg, #6a90e7 0%, #5a80d7 20%, #4a70c7 40%, #365aa6 60%, #2a4785 80%, #1e3564 100%)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(54, 90, 166, 0.5), inset 0 2px 5px rgba(255, 255, 255, 0.35), inset 0 -3px 8px rgba(0, 0, 0, 0.25)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <span style={{ position: 'relative', zIndex: 1, textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>
                  Get a Demo
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
