import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactCta from "../components/ContactCta";
import ServiceCards from "../components/ServiceCards";
import { COMPANY, INTRO, TAGLINE } from "../data/site";

export const metadata = { title: `Услуги | ${COMPANY}` };

export default function Services() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-white pt-40 pb-16 xl:pt-48">
          <div className="mx-auto max-w-[1600px] px-6 xl:px-15">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-sis-purple">{COMPANY}</p>
            <h1 className="heading-xl max-w-[16ch] text-sis-purple">Услуги</h1>
            <p className="mt-8 max-w-3xl text-xl font-semibold">{TAGLINE}</p>
            <div className="mt-6 grid max-w-5xl gap-4 text-neutral-700 lg:grid-cols-2">
              {INTRO.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white pb-24">
          <div className="mx-auto max-w-[1600px] px-6 xl:px-15">
            <ServiceCards />
          </div>
        </section>

        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
