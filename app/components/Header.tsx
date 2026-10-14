"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { COMPANY, PHONES, SERVICES } from "../data/site";

const mainMenu = [
  ["Начало", "/"],
  ["Услуги", "/services"],
  ["Проекти", "/projects"],
  ["Недвижими имоти", "/services/nedvizhimi-imoti"],
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
        <div className="mx-auto flex max-w-[1600px] justify-end gap-8 px-15 py-2 text-xs">
          {PHONES.map((p) => (
            <a key={p.href} href={p.href} className="hover:text-evergreen">{p.label}</a>
          ))}
        </div>
      </div>

      <div className={`transition-colors ${scrolled || open ? "bg-white shadow-sm" : "bg-white/95"}`}>
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 xl:px-15">
          <Link href="/" onClick={() => setOpen(false)} className="font-display text-2xl font-bold uppercase tracking-tight text-sis-purple">
            {COMPANY.replace(/ \d+$/, "")} <span className="font-medium">{COMPANY.match(/\d+$/)?.[0]}</span>
          </Link>

          <nav className="hidden items-center gap-10 xl:flex">
            {mainMenu.map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-semibold uppercase tracking-wide hover:text-sis-purple">
                {label}
              </Link>
            ))}
            <Link href="/contact" className="btn">Контакти</Link>
          </nav>

          <button
            type="button"
            aria-label="Меню"
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
            {[...mainMenu, ["Контакти", "/contact"]].map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="heading-md">{label}</Link>
            ))}
          </nav>
          <nav className="mt-10 flex flex-col gap-3 text-white/80">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setOpen(false)}>{s.title}</Link>
            ))}
          </nav>
          <div className="mt-10 flex flex-col gap-2">
            {PHONES.map((p) => (
              <a key={p.href} href={p.href} className="font-semibold text-evergreen">{p.label}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
