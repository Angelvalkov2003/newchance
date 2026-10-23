"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

type Props = {
  heading: [first: string, second: string];
  buttonLabel: string;
  buttonHref: string;
  heroImg: { src: string; pos?: string; mobilePos?: string };
  images: { src: string; alt: string; pos?: string }[];
};

function Motto({ heading }: { heading: [string, string] }) {
  return (
    <h2
      className="heading-xl flex w-full justify-center gap-x-[0.25em] xl:leading-[152px]"
      style={{ fontSize: "min(15vw, 180px)" }}
    >
      <span>{heading[0]}</span>
      <span>{heading[1]}</span>
    </h2>
  );
}

function ProjectsButton({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="group pointer-events-auto mt-2 inline-flex items-center gap-4 bg-evergreen py-1.5 pl-6 pr-1.5 text-sm font-semibold uppercase tracking-wider text-midnight shadow-lg shadow-black/20 transition-colors duration-300 hover:bg-white xl:mt-10"
    >
      {label}
      <span className="flex h-10 w-10 items-center justify-center bg-midnight text-evergreen transition-transform duration-300 group-hover:translate-x-1">
        <svg width="14" height="12" viewBox="0 0 11 10" fill="none" aria-hidden>
          <path stroke="currentColor" strokeWidth="1.5" d="M0 5h9.5M6 1l4 4-4 4" />
        </svg>
      </span>
    </a>
  );
}

function MobileHero({
  heading,
  buttonLabel,
  buttonHref,
  heroImg,
  images,
}: Props) {
  const collage = images.slice(0, 4);
  return (
    <section className="relative">
      <div className="relative h-[72svh] min-h-[380px] overflow-hidden">
        <Image
          src={heroImg.src}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={60}
          className="object-cover"
          style={{ objectPosition: heroImg.mobilePos ?? heroImg.pos ?? "center" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 px-6 text-center text-white">
          <Motto heading={heading} />
          <ProjectsButton label={buttonLabel} href={buttonHref} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-0.5 bg-midnight">
        {collage.map((img) => (
          <div key={img.src} className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              loading="lazy"
              sizes="50vw"
              quality={55}
              className="object-cover"
              style={{ objectPosition: img.pos }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function DesktopPin({
  heading,
  buttonLabel,
  buttonHref,
  heroImg,
  images,
}: Props) {
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
    let resizeTimer = 0;

    const measure = () => {
      vh = pin.clientHeight || window.innerHeight;
      section.style.height = `${(reduceMotion ? 1 : images.length + 1) * vh}px`;
    };

    const setTile = (tile: HTMLDivElement, t: number, i: number) => {
      const prev = lastT.current[i];
      if (prev !== undefined && Math.abs(prev - t) < 0.003) return;
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
        });
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - vh;
      if (scrollable <= 0 || vh <= 0) return;

      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1) * images.length;
      const inView = rect.bottom > 0 && rect.top < vh * 1.25;

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
        tile.style.visibility = t <= 0 && progress < i - 0.15 ? "hidden" : "visible";
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
      }, 120);
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
      style={{ height: `${(images.length + 1) * 100}svh` }}
    >
      <div ref={pinRef} className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImg.src}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={65}
            className="object-cover"
            style={{ objectPosition: heroImg.pos ?? "center" }}
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />

        {images.map((img, i) => (
          <div
            key={img.src}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            className={`absolute top-0 h-svh w-1/2 overflow-hidden ${i % 2 === 0 ? "left-0" : "left-1/2"}`}
            style={{ transform: "translate3d(0, 100vh, 0)", zIndex: 10 + i }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              loading={i === 0 ? "eager" : "lazy"}
              sizes="50vw"
              quality={60}
              className="object-cover"
              style={{ objectPosition: img.pos }}
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center gap-8 px-6 text-center text-white">
          <Motto heading={heading} />
          <ProjectsButton label={buttonLabel} href={buttonHref} />
        </div>
      </div>
    </section>
  );
}

/**
 * Мобилно: лек hero + статична решетка (без sticky / scroll JS).
 * Desktop: pinned scroll анимация.
 * Монтира се само единият вариант – иначе Next зарежда и двата Image дървета.
 */
export default function SportImageGrid(props: Props) {
  const [desktop, setDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // SSR / първи paint: мобилен layout (по-лек) – избягва 6 GPU слоя преди hydrate
  if (desktop === null || !desktop) {
    return <MobileHero {...props} />;
  }

  return <DesktopPin {...props} />;
}
