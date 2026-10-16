"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { COMPANY, EMAIL, PHONES, SERVICES } from "../data/site";

const mainMenu = [
  ["Начало", "/"],
  ["Услуги", "/services"],
  ["Проекти", "/projects"],
  ["Недвижими имоти", "/services/nedvizhimi-imoti"],
];

const linkClass = "text-sm font-semibold uppercase tracking-wide hover:text-sis-purple";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Заключва скрола на страницата и затваря с Esc, докато менюто е отворено
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[110]">
      <div className="hidden bg-sis-purple text-white xl:block">
        <div className="mx-auto flex max-w-[1600px] justify-end gap-8 px-15 py-2 text-xs">
          <a href={`mailto:${EMAIL}`} className="hover:text-evergreen">{EMAIL}</a>
          {PHONES.map((p) => (
            <a key={p.href} href={p.href} className="hover:text-evergreen">{p.label}</a>
          ))}
        </div>
      </div>

      <div className={`transition-colors ${scrolled || open ? "bg-white shadow-sm" : "bg-white/95"}`}>
        {/* Логото е вляво, всички страници са вдясно */}
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-6 py-4 xl:px-15">
          <Link href="/" onClick={() => setOpen(false)} className="font-display text-2xl font-bold uppercase tracking-tight text-sis-purple">
            {COMPANY}
          </Link>

          <nav className="hidden items-center gap-10 xl:flex">
            {mainMenu.map(([label, href]) => (
              <Link key={href} href={href} className={linkClass}>{label}</Link>
            ))}
            <Link href="/contact" className="btn">Контакти</Link>
          </nav>

          <button
            type="button"
            aria-label={open ? "Затвори менюто" : "Отвори менюто"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className={`flex h-11 w-11 items-center justify-center transition-colors duration-300 xl:hidden ${
              open ? "bg-sis-purple" : "bg-evergreen"
            }`}
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-0.5 w-full transition-all duration-300 ${open ? "top-1.5 rotate-45 bg-white" : "top-0 bg-midnight"}`} />
              <span className={`absolute right-0 top-1.5 h-0.5 bg-midnight transition-all duration-300 ${open ? "w-0 opacity-0" : "w-3/5"}`} />
              <span className={`absolute left-0 h-0.5 w-full transition-all duration-300 ${open ? "top-1.5 -rotate-45 bg-white" : "top-3 bg-midnight"}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Мобилно меню: панел, който се плъзга отдясно */}
      <div
        onClick={close}
        aria-hidden
        className={`fixed inset-0 -z-10 bg-midnight/60 backdrop-blur-sm transition-opacity duration-500 xl:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-hidden={!open}
        inert={!open}
        className={`mobile-drawer fixed bottom-0 right-0 top-[76px] -z-10 flex w-full max-w-md flex-col overflow-y-auto bg-sis-purple text-white shadow-2xl xl:hidden ${
          open ? "is-open translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-evergreen/15 blur-3xl" />

        <nav className="relative px-6 pt-8">
          <p className="drawer-item mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50">Меню</p>
          <ul className="border-t border-white/10">
            {[...mainMenu, ["Контакти", "/contact"]].map(([label, href], i) => (
              <li key={href} className="drawer-item border-b border-white/10" style={{ "--i": i } as React.CSSProperties}>
                <Link href={href} onClick={close} className="group flex items-center gap-4 py-4">
                  <span className="w-6 font-display text-xs text-evergreen">0{i + 1}</span>
                  <span className="flex-1 font-display text-2xl font-semibold uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                    {label}
                  </span>
                  <span className="text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-evergreen">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="drawer-item relative px-6 pt-8" style={{ "--i": 5 } as React.CSSProperties}>
          <button
            type="button"
            onClick={() => setServicesOpen(!servicesOpen)}
            aria-expanded={servicesOpen}
            className="flex w-full items-center justify-between text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50"
          >
            Услуги
            <span className={`text-base text-evergreen transition-transform duration-300 ${servicesOpen ? "rotate-45" : ""}`}>+</span>
          </button>
          <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${servicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <ul className="overflow-hidden">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    onClick={close}
                    className="flex items-center gap-3 py-2 text-sm text-white/80 transition-colors first:mt-4 hover:text-evergreen"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-evergreen" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="drawer-item relative mt-auto px-6 pb-8 pt-10" style={{ "--i": 6 } as React.CSSProperties}>
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50">Свържете се</p>
            <div className="mt-3 flex flex-col gap-1.5">
              {PHONES.map((p) => (
                <a key={p.href} href={p.href} className="font-semibold text-white transition-colors hover:text-evergreen">{p.label}</a>
              ))}
              <a href={`mailto:${EMAIL}`} className="break-all text-sm text-white/70 transition-colors hover:text-evergreen">{EMAIL}</a>
            </div>
            <Link href="/contact" onClick={close} className="btn mt-5 w-full justify-center">Изпратете запитване →</Link>
          </div>
        </div>
      </aside>
    </header>
  );
}
