"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Props = {
  heading: [first: string, second: string];
  buttonLabel: string;
  buttonHref: string;
  heroImg: { src: string; pos?: string; mobilePos?: string };
  images: { src: string; alt: string; pos?: string }[];
};

/**
 * Секцията се "закача" (sticky) за екрана; докато скролваш, снимките
 * изплуват отдолу една по една – редуват се ляво/дясно (на мобилно – горе/долу, на половин екран).
 *
 * Височините и translate са в px (не svh в JS), за да няма лаг/скокове на iOS
 * и чупене на скрола на Android при смяна на адресната лента.
 */
export default function SportImageGrid({ heading, buttonLabel, buttonHref, heroImg, images }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastT = useRef<number[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let vh = 0;
    let pinned = false;

    const measure = () => {
      vh = pin.clientHeight || window.innerHeight;
      // Пикселна височина = стабилен progress на всички мобилни браузъри
      section.style.height = `${(reduceMotion ? 1 : images.length + 1) * vh}px`;
    };

    const setTile = (tile: HTMLDivElement, t: number, i: number) => {
      const prev = lastT.current[i];
      if (prev !== undefined && Math.abs(prev - t) < 0.002) return;
      lastT.current[i] = t;
      const y = Math.round((1 - t) * vh);
      tile.style.transform = `translate3d(0,${y}px,0)`;
    };

    const update = () => {
      frame = 0;
      if (reduceMotion) {
        tileRefs.current.forEach((tile, i) => {
          if (!tile) return;
          lastT.current[i] = 1;
          tile.style.transform = "translate3d(0,0,0)";
        });
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - vh;
      if (scrollable <= 0 || vh <= 0) return;

      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1) * images.length;
      const inView = rect.bottom > 0 && rect.top < vh * 1.25;

      // will-change само докато секцията е на екрана – иначе Android/iOS държат 5+ GPU слоя завинаги
      if (inView !== pinned) {
        pinned = inView;
        const wc = inView ? "transform" : "auto";
        tileRefs.current.forEach((tile) => {
          if (tile) tile.style.willChange = wc;
        });
      }

      tileRefs.current.forEach((tile, i) => {
        if (!tile) return;
        setTile(tile, Math.min(Math.max(progress - i, 0), 1), i);
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      lastT.current = [];
      measure();
      onScroll();
    };

    measure();
    // Първи кадър: сложи плочките под екрана преди paint на скрол
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
    window.visualViewport?.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
    };
  }, [images.length]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      // Fallback преди JS; после useEffect задава точния px height
      style={{ height: `${(images.length + 1) * 100}svh` }}
    >
      <div ref={pinRef} className="sticky top-0 h-svh touch-pan-y overflow-clip [contain:paint]">
        {/* relative wrapper – next/image fill не приема sticky като parent */}
        <div className="absolute inset-0">
          <Image
            src={heroImg.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-(--pos-m) lg:object-(--pos)"
            style={{ "--pos": heroImg.pos ?? "center", "--pos-m": heroImg.mobilePos ?? heroImg.pos ?? "center" } as React.CSSProperties}
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />

        {images.map((img, i) => (
          <div
            key={img.src}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            className={`absolute left-0 h-1/2 w-full overflow-hidden lg:top-0 lg:h-svh lg:w-1/2 ${
              i % 2 === 0 ? "top-0" : "top-1/2 lg:left-1/2"
            }`}
            style={{ transform: "translate3d(0, 100vh, 0)", zIndex: 10 + i }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              // Само първите 2 се зареждат веднага – останалите по време на скрол чупят Android/iPhone
              loading={i < 2 ? "eager" : "lazy"}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: img.pos }}
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center gap-8 px-6 text-center text-white">
          <h2 className="heading-xl flex w-full justify-center gap-x-[0.25em] xl:leading-[152px]" style={{ fontSize: "min(15vw, 180px)" }}>
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
