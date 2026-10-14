"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Props = {
  heading: [left: string, right: string]; // двете думи се срещат в центъра на екрана
  buttonLabel: string;
  buttonHref: string;
  heroImg: { src: string; pos?: string };
  images: { src: string; alt: string; pos?: string }[];
};

/**
 * Секцията се "закача" (sticky) за екрана; докато скролваш, снимките
 * изплуват отдолу една по една – редуват се ляво/дясно (на мобилно – горе/долу, на половин екран).
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
        tile.style.transform = `translate3d(0, ${(1 - t) * 100}vh, 0)`;
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
        <Image src={heroImg.src} alt="" fill preload sizes="100vw" className="object-cover" style={{ objectPosition: heroImg.pos }} />
        <div className="absolute inset-0 bg-black/40" />

        {images.map((img, i) => (
          <div
            key={img.src}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            className={`absolute left-0 h-1/2 w-full overflow-hidden will-change-transform lg:top-0 lg:h-screen lg:w-1/2 ${
              i % 2 === 0 ? "top-0" : "top-1/2 lg:left-1/2"
            }`}
            style={{ transform: "translate3d(0, 100vh, 0)", zIndex: 10 + i }}
          >
            <Image src={img.src} alt={img.alt} fill loading="eager" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" style={{ objectPosition: img.pos }} />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center gap-8 px-6 text-center text-white">
          <h2 className="heading-xl grid w-full grid-cols-2 gap-x-[0.15em] xl:leading-[152px]" style={{ fontSize: "min(13vw, 180px)" }}>
            <span className="pr-[0.15em] text-right">{heading[0]}</span>
            <span className="text-left">{heading[1]}</span>
          </h2>
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
