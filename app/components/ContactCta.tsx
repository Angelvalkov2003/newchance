import Link from "next/link";
import { CONTACT_CTA, PHONES } from "../data/site";

export default function ContactCta({ showLink = true }: { showLink?: boolean }) {
  return (
    <section className="bg-midnight px-6 py-24 text-center text-white">
      <h2 className="heading-lg">{CONTACT_CTA.title}</h2>
      <p className="mx-auto mt-6 max-w-2xl text-white/80">{CONTACT_CTA.text}</p>
      <p className="mx-auto mt-3 max-w-2xl text-white/80">{CONTACT_CTA.sub}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {PHONES.map((p) => (
          <a key={p.href} href={p.href} className="btn">
            <PhoneIcon /> {p.label}
          </a>
        ))}
        {showLink && (
          <Link href="/contact" className="btn btn--outline">Контакти</Link>
        )}
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}
