import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GsapFadeIn({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 1 });
  }, []);

  return <div ref={ref}>{children}</div>;
}
