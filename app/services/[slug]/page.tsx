import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactCta from "../../components/ContactCta";
import { COMPANY, SERVICES } from "../../data/site";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  return { title: service ? `${service.title} | ${COMPANY}` : COMPANY };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const index = SERVICES.findIndex((s) => s.slug === slug);
  if (index < 0) notFound();
  const service = SERVICES[index];
  const next = SERVICES[(index + 1) % SERVICES.length];

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="relative flex h-[70vh] min-h-[480px] items-end overflow-hidden bg-midnight text-white">
          <Image src={service.img.src} alt="" fill preload sizes="100vw" className="object-cover" style={{ objectPosition: service.img.pos }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
          <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-16 xl:px-15">
            <Link href="/services" className="text-sm font-semibold uppercase tracking-wide text-evergreen hover:text-white">
              ← Всички услуги
            </Link>
            <h1 className="heading-xl mt-4 max-w-[18ch]">{service.title}</h1>
          </div>
        </section>

        {/* INTRO + DETAILS */}
        <section className="bg-white py-24">
          <div className="mx-auto grid max-w-[1600px] gap-16 px-6 xl:grid-cols-12 xl:px-15">
            <div className="xl:col-span-4">
              <span className="font-display text-sm font-semibold text-sis-purple">
                {String(index + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
              </span>
              <p className="mt-4 text-xl font-semibold leading-relaxed">{service.intro}</p>
              {service.note && <p className="mt-6 text-neutral-700">{service.note}</p>}
            </div>

            {service.groups.length > 0 && (
              <div className="grid gap-12 md:grid-cols-2 xl:col-span-8">
                {service.groups.map((g, gi) => (
                  <div key={gi} className={service.groups.length === 1 ? "md:col-span-2" : ""}>
                    {g.title && <h2 className="heading-md mb-6 text-sis-purple">{g.title}</h2>}
                    <ul className={`grid gap-3 ${service.groups.length === 1 ? "md:grid-cols-2" : ""}`}>
                      {g.items.map((item) => (
                        <li key={item} className="flex gap-3 border-t border-neutral-200 pt-3 text-neutral-800">
                          <span className="mt-2 h-2 w-2 shrink-0 bg-evergreen" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* NEXT SERVICE */}
        <Link href={`/services/${next.slug}`} className="group block bg-neutral-100 py-16">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-6 xl:px-15">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Следваща услуга</p>
              <p className="heading-lg mt-2 text-sis-purple group-hover:text-midnight">{next.title}</p>
            </div>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-evergreen text-midnight transition-transform group-hover:translate-x-2">
              <svg width="18" height="16" viewBox="0 0 11 10" fill="none" aria-hidden>
                <path stroke="currentColor" d="M0 5h9.5M6 1l4 4-4 4" />
              </svg>
            </span>
          </div>
        </Link>

        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
