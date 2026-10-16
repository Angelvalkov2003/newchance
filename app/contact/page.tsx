import Header from "../components/Header";
import Footer from "../components/Footer";
import { COMPANY, CONTACT_CTA, EMAIL, PHONES } from "../data/site";

export const metadata = { title: `Контакти | ${COMPANY}` };

export default function Contact() {
  return (
    <>
      <Header />
      <main className="bg-white pt-40 pb-24 xl:pt-48">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 xl:grid-cols-2 xl:px-15">
          <div>
            <h1 className="heading-xl text-sis-purple">{CONTACT_CTA.title}</h1>
            <p className="mt-8 max-w-xl text-lg text-neutral-700">{CONTACT_CTA.text}</p>
            <p className="mt-4 max-w-xl text-lg text-neutral-700">{CONTACT_CTA.sub}</p>
          </div>
          <div className="flex flex-col justify-end gap-5">
            {PHONES.map((p) => (
              <a key={p.href} href={p.href} className="group flex items-center justify-between gap-6 bg-midnight px-8 py-8 text-white transition-colors hover:bg-sis-purple">
                <span>
                  <span className="block text-sm uppercase tracking-wide text-white/60">Телефон</span>
                  <span className="heading-md mt-1 block normal-case">{p.label}</span>
                </span>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-evergreen text-midnight">
                  <svg width="18" height="16" viewBox="0 0 11 10" fill="none" aria-hidden>
                    <path stroke="currentColor" d="M0 5h9.5M6 1l4 4-4 4" />
                  </svg>
                </span>
              </a>
            ))}
            <a href={`mailto:${EMAIL}`} className="group flex items-center justify-between gap-6 bg-midnight px-8 py-8 text-white transition-colors hover:bg-sis-purple">
              <span className="min-w-0">
                <span className="block text-sm uppercase tracking-wide text-white/60">Имейл</span>
                <span className="heading-md mt-1 block break-all normal-case">{EMAIL}</span>
              </span>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-evergreen text-midnight">
                <svg width="18" height="16" viewBox="0 0 11 10" fill="none" aria-hidden>
                  <path stroke="currentColor" d="M0 5h9.5M6 1l4 4-4 4" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
