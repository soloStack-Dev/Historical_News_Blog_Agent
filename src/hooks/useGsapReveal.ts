import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  const initAnimations = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(".gsap-reveal");

    if (elements.length === 0) return;

    elements.forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(30px)";
    });

    const timers: ReturnType<typeof setTimeout>[] = [];

    elements.forEach((el, i) => {
      const delay = i * 0.1;

      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay,
            ease: "power2.out",
          });
        },
      });

      const t = setTimeout(() => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay,
          ease: "power2.out",
        });
      }, 300 + delay * 1000);
      timers.push(t);
    });

    return () => {
      timers.forEach(clearTimeout);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      initAnimations();
    });

    return () => cancelAnimationFrame(frameId);
  }, [initAnimations]);

  return containerRef;
}
