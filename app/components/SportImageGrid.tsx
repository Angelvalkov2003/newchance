"use client";

import { useEffect, useRef } from "react";

type Props = {
  heading: string;
  buttonLabel: string;
  buttonHref: string;
  heroImg: string;
  images: { src: string; alt: string }[];
};

/**
 * Секцията се "закача" (sticky) за екрана; докато скролваш, снимките
 * изплуват отдолу една по една – редуват се ляво/дясно (на мобилно са на цял екран).
 */
export default function SportImageGrid({ heading, buttonLabel, buttonHref, heroImg, images }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1) * images.length;

      tileRefs.current.forEach((tile, i) => {
        if (!tile) return;
        const t = Math.min(Math.max(progress - i, 0), 1); // 0 = долу, 1 = на място
        tile.style.transform = `translate3d(0, ${(1 - t) * 100}%, 0)`;
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [images.length]);

  return (
    <section ref={sectionRef} className="relative" style={{ height: `${(images.length + 1) * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />

        {images.map((img, i) => (
          <div
            key={img.src}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            className={`absolute top-0 h-screen w-full overflow-hidden will-change-transform lg:w-1/2 ${
              i % 2 === 0 ? "left-0" : "left-0 lg:left-1/2"
            }`}
            style={{ transform: "translate3d(0, 100%, 0)", zIndex: 10 + i }}
          >
            <img src={img.src} alt={img.alt} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center gap-8 px-6 text-center text-white">
          <h2 className="heading-xl max-w-[12ch] xl:text-[180px] xl:leading-[152px]">{heading}</h2>
          <a href={buttonHref} className="btn pointer-events-auto mt-4 xl:mt-10">
            {buttonLabel}
            <svg width="11" height="10" viewBox="0 0 11 10" fill="none" aria-hidden>
              <path stroke="currentColor" d="M0 5h9.5M6 1l4 4-4 4" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
