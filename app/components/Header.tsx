"use client";

import { useEffect, useState } from "react";

const BASE = "https://www.sispitches.com";

const mainMenu = [
  ["Sports", "/sports/"],
  ["Services", "/our-services/"],
  ["Surfaces", "/surfaces/"],
  ["Systems", "/systems/"],
  ["About", "/about/"],
];

const secondaryMenu = [
  ["Case Studies", "/case-studies/"],
  ["News", "/news/"],
  ["Sustainability", "/about/sustainability/"],
  ["Innovation", "/about/innovation/"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[110]">
      <div className="hidden bg-sis-purple text-white xl:block">
        <nav className="mx-auto flex max-w-[1600px] justify-end gap-8 px-15 py-2 text-xs">
          {secondaryMenu.map(([label, href]) => (
            <a key={href} href={`${BASE}${href}`} className="hover:text-evergreen">{label}</a>
          ))}
        </nav>
      </div>

      <div className={`transition-colors ${scrolled || open ? "bg-white shadow-sm" : "bg-white/95"}`}>
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 xl:px-15">
          <a href="/" className="font-display text-2xl font-bold uppercase tracking-tight text-sis-purple">
            SIS <span className="font-medium">Pitches</span>
          </a>

          <nav className="hidden items-center gap-10 xl:flex">
            {mainMenu.map(([label, href]) => (
              <a key={href} href={`${BASE}${href}`} className="text-sm font-semibold uppercase tracking-wide hover:text-sis-purple">
                {label}
              </a>
            ))}
            <a href={`${BASE}/contact/`} className="btn">Contact</a>
          </nav>

          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center bg-evergreen xl:hidden"
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-0.5 w-full bg-midnight transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-full bg-midnight ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-0.5 w-full bg-midnight transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="h-[calc(100vh-76px)] overflow-y-auto bg-sis-purple px-6 py-10 text-white xl:hidden">
          <nav className="flex flex-col gap-4">
            {mainMenu.map(([label, href]) => (
              <a key={href} href={`${BASE}${href}`} className="heading-md">{label}</a>
            ))}
          </nav>
          <nav className="mt-10 flex flex-col gap-3 text-white/80">
            {secondaryMenu.map(([label, href]) => (
              <a key={href} href={`${BASE}${href}`}>{label}</a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
