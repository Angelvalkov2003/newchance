"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  heading: [first: string, second: string];
  buttonLabel: string;
  buttonHref: string;
  heroImg: { src: string; pos?: string; mobilePos?: string };
  images: { src: string; alt: string; pos?: string }[];
};

/**
 * Pinned scroll анимация (телефон + desktop).
 * На мобилно плочките са горе/долу на половин екран; на lg – ляво/дясно.
 * Зареждаме Image само за близките плочки, за да не крашва Samsung от памет.
 */
export default function SportImageGrid({ heading, buttonLabel, buttonHref, heroImg, images }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastT = useRef<number[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let vh = 0;
    let pinned = false;
    let resizeTimer = 0;
    let lastActive = -1;

    const measure = () => {
      vh = pin.clientHeight || window.innerHeight;
      section.style.height = `${(reduceMotion ? 1 : images.length + 1) * vh}px`;
    };

    const setTile = (tile: HTMLDivElement, t: number, i: number) => {
      const prev = lastT.current[i];
      if (prev !== undefined && Math.abs(prev - t) < 0.004) return;
      lastT.current[i] = t;
      tile.style.transform = `translate3d(0,${Math.round((1 - t) * vh)}px,0)`;
    };

    const update = () => {
      frame = 0;
      if (reduceMotion) {
        tileRefs.current.forEach((tile, i) => {
          if (!tile) return;
          lastT.current[i] = 1;
          tile.style.transform = "translate3d(0,0,0)";
          tile.style.visibility = "visible";
        });
        if (lastActive !== images.length) {
          lastActive = images.length;
          setActive(images.length);
        }
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - vh;
      if (scrollable <= 0 || vh <= 0) return;

      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1) * images.length;
      const inView = rect.bottom > 0 && rect.top < vh * 1.25;
      const nextActive = Math.min(images.length, Math.max(0, Math.floor(progress + 0.35)));

      if (nextActive !== lastActive) {
        lastActive = nextActive;
        setActive(nextActive);
      }

      if (inView !== pinned) {
        pinned = inView;
        const wc = inView ? "transform" : "auto";
        tileRefs.current.forEach((tile) => {
          if (tile) tile.style.willChange = wc;
        });
      }

      tileRefs.current.forEach((tile, i) => {
        if (!tile) return;
        const t = Math.min(Math.max(progress - i, 0), 1);
        // Скрий плочки далеч от текущия progress – по-малко GPU на Samsung
        const near = Math.abs(progress - i) < 1.35 || t > 0;
        tile.style.visibility = near || t > 0.001 ? "visible" : "hidden";
        setTile(tile, t, i);
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        lastT.current = [];
        measure();
        onScroll();
      }, 150);
    };

    measure();
    tileRefs.current.forEach((tile, i) => {
      if (!tile) return;
      if (reduceMotion) {
        tile.style.transform = "translate3d(0,0,0)";
        lastT.current[i] = 1;
      } else {
        tile.style.transform = `translate3d(0,${vh}px,0)`;
        lastT.current[i] = 0;
      }
    });
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [images.length]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${(images.length + 1) * 100}vh` }}
    >
      {/* 100vh – максимална съвместимост със Samsung Internet (svh чупи по-стари) */}
      <div ref={pinRef} className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImg.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-(--pos-m) lg:object-(--pos)"
            style={
              {
                "--pos": heroImg.pos ?? "center",
                "--pos-m": heroImg.mobilePos ?? heroImg.pos ?? "center",
              } as React.CSSProperties
            }
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />

        {images.map((img, i) => {
          // Монтирай снимка само ако е близо до текущия progress (active ± 1)
          const shouldLoad = i <= active + 1;
          return (
            <div
              key={img.src}
              ref={(el) => {
                tileRefs.current[i] = el;
              }}
              className={`absolute left-0 h-1/2 w-full overflow-hidden lg:top-0 lg:h-screen lg:w-1/2 ${
                i % 2 === 0 ? "top-0" : "top-1/2 lg:left-1/2"
              }`}
              style={{ transform: "translate3d(0, 100vh, 0)", zIndex: 10 + i }}
            >
              {shouldLoad && (
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: img.pos }}
                />
              )}
              <div className="absolute inset-0 bg-black/60" />
            </div>
          );
        })}

        <div className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center gap-8 px-6 text-center text-white">
          <h2
            className="heading-xl flex w-full justify-center gap-x-[0.25em] xl:leading-[152px]"
            style={{ fontSize: "min(15vw, 180px)" }}
          >
            <span>{heading[0]}</span>
            <span>{heading[1]}</span>
          </h2>
          <a
            href={buttonHref}
            className="group pointer-events-auto mt-2 inline-flex items-center gap-4 bg-evergreen py-1.5 pl-6 pr-1.5 text-sm font-semibold uppercase tracking-wider text-midnight shadow-lg shadow-black/20 transition-colors duration-300 hover:bg-white xl:mt-10"
          >
            {buttonLabel}
            <span className="flex h-10 w-10 items-center justify-center bg-midnight text-evergreen transition-transform duration-300 group-hover:translate-x-1">
              <svg width="14" height="12" viewBox="0 0 11 10" fill="none" aria-hidden>
                <path stroke="currentColor" strokeWidth="1.5" d="M0 5h9.5M6 1l4 4-4 4" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
