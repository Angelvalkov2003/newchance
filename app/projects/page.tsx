import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactCta from "../components/ContactCta";
import { COMPANY } from "../data/site";

export const metadata = { title: `Проекти | ${COMPANY}` };

// TODO: съдържание за проектите – чакаме снимки и инфо от клиента
export default function Projects() {
  return (
    <>
      <Header />
      <main>
        <section className="mx-auto flex min-h-[70vh] max-w-[1600px] flex-col justify-center px-6 pt-40 pb-24 xl:px-15">
          <h1 className="heading-xl text-sis-purple">Нашите проекти</h1>
          <p className="mt-8 max-w-xl text-lg text-neutral-700">Очаквайте скоро.</p>
        </section>
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
