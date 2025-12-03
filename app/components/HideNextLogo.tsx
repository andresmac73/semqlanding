"use client";

import { useEffect } from "react";

export default function HideNextLogo() {
  useEffect(() => {
    const hideNextLogo = () => {
      // Ocultar elementos que contengan el logo de Next.js
      const selectors = [
        'a[href*="nextjs"][target="_blank"]',
        'a[href*="vercel"][target="_blank"]',
        '#__next-build-watcher',
        '[data-nextjs-dialog]',
        '[data-nextjs-toast]'
      ];
      
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          (el as HTMLElement).style.display = 'none';
          (el as HTMLElement).style.visibility = 'hidden';
          (el as HTMLElement).style.opacity = '0';
        });
      });
      
      // Ocultar elementos fijos en la esquina inferior izquierda
      const fixedElements = document.querySelectorAll('div[style*="position: fixed"]');
      fixedElements.forEach(el => {
        const style = (el as HTMLElement).getAttribute('style') || '';
        if (style.includes('bottom') && style.includes('left')) {
          const hasNextLink = el.querySelector('a[href*="nextjs"]') || el.querySelector('a[href*="vercel"]');
          if (hasNextLink) {
            (el as HTMLElement).style.display = 'none';
          }
        }
      });
    };
    
    // Ejecutar inmediatamente y periódicamente
    hideNextLogo();
    const interval = setInterval(hideNextLogo, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return null;
}

