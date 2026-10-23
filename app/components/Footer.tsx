import Link from "next/link";
import { COMPANY, EMAIL, PHONES, SERVICES, TAGLINE } from "../data/site";

export default function Footer() {
  return (
    <>
      <div className="h-6 bg-evergreen" />
      <footer className="bg-midnight pt-16 pb-10 text-white">
        <div className="mx-auto max-w-[1600px] px-6 xl:px-15">
          <div className="grid gap-12 xl:grid-cols-12">
            <div className="xl:col-span-4">
              <Link href="/" className="font-display text-3xl font-bold uppercase tracking-tight">
                {COMPANY}
              </Link>
              <p className="mt-4 max-w-sm text-sm text-white/70">{TAGLINE}</p>
            </div>
            <nav className="xl:col-span-5">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wide">Услуги</h4>
              <ul className="grid gap-2 text-sm text-white/70 sm:grid-cols-2">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="hover:text-evergreen">{s.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="xl:col-span-3">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wide">Контакти</h4>
              <ul className="space-y-2 text-sm">
                {PHONES.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} className="text-white/70 hover:text-evergreen">{p.label}</a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${EMAIL}`} className="text-white/70 hover:text-evergreen">{EMAIL}</a>
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-16 flex items-center gap-2 border-t border-white/15 pt-8 text-xs text-white/50">
            <span>© {new Date().getFullYear()} {COMPANY}</span>
            <span className="font-medium uppercase tracking-[0.2em] text-evergreen/70">new3</span>
          </p>
        </div>
      </footer>
    </>
  );
}
