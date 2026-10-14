import Header from "./components/Header";
import Services from "./components/Services";
import SportImageGrid from "./components/SportImageGrid";
import Link from "next/link";
import Footer from "./components/Footer";
import ContactCta from "./components/ContactCta";
import ServiceCards from "./components/ServiceCards";
import Image from "next/image";
import { COMPANY, HOME_IMAGES, INTRO, TAGLINE } from "./data/site";

const BASE = "https://www.sispitches.com";
const UP = `${BASE}/wp-content/uploads`;

// Секциите от шаблона (hero, услуги, лога, footer...) са скрити, не изтрити – true ги показва пак
const SHOW_TEMPLATE = false;
const SHOW_SERVICES = false;

const MOTTO: [string, string] = ["New", "Chance"];

// TODO: заместващ текст – клиентът да подаде финалните текстове за всяка секция
const COPY = "Placeholder text – replace with the final copy from the client.";

const surfaces = [
  { title: "Natural Grass", href: `${BASE}/surface/natural-grass/`, img: `${UP}/2024/12/natural.jpeg` },
  { title: "Hybrid Grass", href: `${BASE}/surface/hybrid-grass/`, img: `${UP}/2024/12/hybrid-featured.jpg` },
  { title: "Synthetic Grass", href: `${BASE}/surface/synthetic-grass/`, img: `${UP}/2024/12/court.jpeg` },
  { title: "Tracks", href: `${BASE}/surface/sis-track/`, img: `${UP}/2024/12/athletics.jpeg` },
  { title: "Courts", href: `${BASE}/surface/courts/`, img: `${UP}/2024/12/surfaces-court.jpg` },
];

const sports = [
  { title: "Football", img: `${UP}/2024/12/HERO-SISLOUGH176-Football-Boot-min.jpg` },
  { title: "Baseball", img: `${UP}/2025/01/baseball-2000x1916.jpg` },
  { title: "Hockey", img: `${UP}/2025/01/hockey-2000x1916.jpg` },
  { title: "Rugby & Cricket", img: `${UP}/2025/01/rugby_cricket-2000x1916.jpg` },
  { title: "Padel, Tennis & MUGA", img: `${UP}/2025/01/padel_tennis_muga-2000x1916.jpg` },
  { title: "Lacrosse, Golf & AF", img: `${UP}/2025/01/lacrosse_golf_af-2000x1916.jpg` },
];

const logos = [
  "2025/01/Manchester_City_FC_badge.svg.png",
  "2025/01/Barcelona.png",
  "2025/01/greenbaypackers-updated.png",
  "2025/01/saracens.png",
  "2025/01/Rugby_World_Cup_2023_logo.svg.png",
  "2024/12/attachment-6.png",
  "2024/12/1200px-CA_river_plate_logo.svg_.webp",
  "2025/01/Al_Ain_FC_logo_2024.png",
  "2025/01/Lords.png",
  "2025/01/hpca-updated.png",
  "2025/01/ecb-logo.png",
  "2024/12/attachment-1-3.png",
].map((p) => `${UP}/${p}`);

const caseStudies = [
  { title: "Pitch transformation at El Monumental Stadium complete", slug: "pitch-transformation-at-el-monumental-stadium-complete", img: `${UP}/2024/12/EurGdFhXIAANZ2k-1.jpg` },
  { title: "SIS Grass Hybrid stitching installed at FC Barcelona Training Ground", slug: "sis-grass-hybrid-stitching-installed-at-fc-barcelona-training-ground", img: `${UP}/2018/10/IMG_1153-2000x1500.jpg` },
  { title: "SIS Plus complete transformational maintenance at Durham University", slug: "durhamuniversityathletics", img: `${UP}/2025/01/20220810_151447.webp` },
  { title: "Loughborough University showcases impressive facilities from SIS Pitches", slug: "loughborough-university-showcases-impressive-facilities-from-sis-pitches", img: `${UP}/2024/12/Aerial-view.jpg` },
  { title: "Resurface of Hampton School 3G pitch and tennis courts", slug: "resurface-of-hampton-school-3g-pitch-and-tennis-courts", img: `${UP}/2024/12/Untitled-design-15.webp` },
  { title: "Tianjin Olympic Centre benefits from a new hybrid grass", slug: "tianjin-olympic-centre-benefits-from-a-new-technologically-advanced-pitch", img: `${UP}/2021/06/Tijin.jpg` },
];

const stats = [
  { value: "5", label: "Placeholder label" },
  { value: "1000", label: "Placeholder label" },
  { value: "11", label: "Placeholder label" },
];

const footerCols = [
  { title: "Surfaces", links: [["Synthetic Grass", "/surface/synthetic-grass/"], ["Hybrid Grass", "/surface/hybrid-grass/"], ["Natural Grass", "/surface/natural-grass/"], ["Tracks", "/surface/sis-track/"], ["All Surfaces", "/surfaces/"]] },
  { title: "Sports", links: [["Football", "/sport/football/"], ["Rugby", "/sport/rugby/"], ["Cricket", "/sport/cricket/"], ["Hockey", "/sport/hockey/"], ["All Sports", "/sports/"]] },
  { title: "Systems", links: [["All Systems", "/systems/"]] },
  { title: "Services", links: [["Design", "/service/design/"], ["Manufacturing", "/service/manufacturing/"], ["Construction", "/service/construction/"], ["Resurfacing", "/service/resurfacing/"], ["SIS Plus", "/service/sis-plus-maintenance/"]] },
  { title: "About Us", links: [["About", "/about/"], ["Sustainability", "/about/sustainability/"], ["Innovation", "/about/innovation/"], ["Offices", "/about/offices/"]] },
  { title: "Useful Links", links: [["Case Studies", "/case-studies/"], ["News", "/news/"], ["Contact", "/contact/"]] },
];

const accreditations = [
  "2025/01/fih-new.png",
  "2025/01/esma-new.png",
  "2024/12/GMA.png",
  "2024/12/GSA.png",
  "2024/12/SFMA.png",
  "2024/12/STC-e1736340859601.png",
  "2024/12/WR-e1736511860782.png",
].map((p) => `${UP}/${p}`);

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* Hidden for now – template sections kept for later */}
        {SHOW_TEMPLATE && (
        <>
        {/* HERO */}
        <section className="relative h-screen overflow-hidden bg-midnight text-white">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            muted
            autoPlay
            loop
            playsInline
            poster={`${UP}/2025/01/SIS0468-scaled.jpg`}
          >
            <source type="video/mp4" src={`${UP}/2025/01/framework_test_home.mp4`} />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
          <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-16 xl:px-15">
            <h1 className="heading-xl max-w-[14ch]">Pursuing the possible. Powering more play.</h1>
            <p className="mt-8 max-w-xl text-lg text-white/85">{COPY}</p>
          </div>
        </section>

        {/* SERVICES */}
        <Services copy={COPY} />

        {/* SURFACES */}
        <section className="bg-midnight py-24 text-white">
          <div className="mx-auto max-w-[1600px] px-6 xl:px-15">
            <h2 className="heading-lg mb-12">Surfaces</h2>
          </div>
          <div className="no-scrollbar flex snap-x gap-5 overflow-x-auto px-6 xl:px-15">
            {surfaces.map((s) => (
              <a key={s.title} href={s.href} className="group relative aspect-[3/4] w-[80vw] shrink-0 snap-start overflow-hidden md:w-[38vw] xl:w-[26vw]">
                <img src={s.img} alt={s.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <h3 className="heading-md absolute bottom-6 left-6">{s.title}</h3>
              </a>
            ))}
          </div>
        </section>

        </>
        )}
        {/* HOME – pinned, images slide in on scroll */}
        <SportImageGrid
          heading={MOTTO}
          buttonLabel="Нашите проекти"
          buttonHref="/projects"
          heroImg={HOME_IMAGES.hero}
          images={HOME_IMAGES.tiles}
        />

        {/* ЗА НАС – кратко представяне */}
        <section className="bg-white py-24">
          <div className="mx-auto grid max-w-[1600px] gap-12 px-6 xl:grid-cols-12 xl:px-15">
            <div className="xl:col-span-5">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-sis-purple">{COMPANY}</p>
              <h2 className="heading-lg text-sis-purple">{TAGLINE}</h2>
            </div>
            <div className="flex flex-col gap-5 text-lg text-neutral-700 xl:col-span-6 xl:col-start-7 xl:pt-10">
              {INTRO.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <div className="pt-4">
                <Link href="/services" className="btn">Всички услуги <Arrow /></Link>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-16 max-w-[1600px] px-6 xl:px-15">
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9]">
              <Image
                src={HOME_IMAGES.about.src}
                alt="Спортни терени, строителство и жилищни обекти"
                fill
                sizes="(min-width: 1600px) 1480px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* УСЛУГИ – скрити от началната (има ги в менюто и в „Всички услуги“) */}
        {SHOW_SERVICES && (
        <section className="bg-neutral-100 py-24">
          <div className="mx-auto max-w-[1600px] px-6 xl:px-15">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <h2 className="heading-lg text-sis-purple">Услуги</h2>
              <Link href="/contact" className="btn">Контакти <Arrow /></Link>
            </div>
            <ServiceCards />
          </div>
        </section>
        )}

        <ContactCta />

        {/* Hidden for now – template sections kept for later */}
        {SHOW_TEMPLATE && (
        <>
        {/* LOGOS */}
        <section className="bg-neutral-100 py-24">
          <div className="mx-auto max-w-[1600px] px-6 xl:px-15">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <h2 className="heading-lg text-sis-purple">Trusted by the sports industry</h2>
              <a href={`${BASE}/case-studies/`} className="btn">Case Studies <Arrow /></a>
            </div>
            <div className="grid grid-cols-3 gap-6 md:grid-cols-4 xl:grid-cols-6">
              {logos.map((src) => (
                <div key={src} className="flex aspect-[3/2] items-center justify-center bg-white p-6">
                  <img src={src} alt="" className="max-h-full max-w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INNOVATION */}
        <section className="relative overflow-hidden bg-sis-purple py-24 text-white">
          <img src={`${UP}/2024/11/innovation-cta-e1738167316194.jpg`} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className="relative mx-auto max-w-[1600px] px-6 xl:px-15">
            <h2 className="heading-lg">Innovation in our DNA</h2>
            <p className="mt-6 max-w-2xl text-white/85">{COPY}</p>
            <div className="mt-14 grid gap-10 md:grid-cols-3">
              {stats.map((s, i) => (
                <div key={i} className="border-t border-white/30 pt-6">
                  <div className="heading-xl text-evergreen">{s.value}</div>
                  <p className="mt-3 text-white/80">{s.label}</p>
                </div>
              ))}
            </div>
            <a href={`${BASE}/about/innovation/`} className="btn mt-14">View Innovations <Arrow /></a>
          </div>
        </section>

        {/* BRAND PURPOSE */}
        <section className="grid lg:grid-cols-2">
          <img src={`${UP}/2024/12/SIS0726.jpg`} alt="" className="h-full min-h-[400px] w-full object-cover" />
          <div className="flex flex-col justify-center gap-6 px-6 py-20 xl:px-24">
            <h2 className="heading-lg text-sis-purple">Pursuing the possible. Powering more play.</h2>
            <p className="max-w-xl text-neutral-700">{COPY}</p>
            <div><a href={`${BASE}/about/`} className="btn">About Us <Arrow /></a></div>
          </div>
        </section>

        {/* WORLD-CLASS CTA */}
        <section className="relative overflow-hidden bg-midnight text-white">
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-center gap-6 px-6 py-20 xl:px-15">
              <h2 className="heading-lg">World-class sports surfaces</h2>
              <p className="max-w-xl text-white/80">{COPY}</p>
              <div><a href={`${BASE}/our-services/`} className="btn">Our Services <Arrow /></a></div>
            </div>
            <img src={`${UP}/2024/12/ll-min-2000x1369.jpeg`} alt="" className="h-full min-h-[400px] w-full object-cover" />
          </div>
        </section>

        {/* SITE VISIT */}
        <section className="bg-midnight px-6 py-24 text-center text-white">
          <h2 className="heading-lg">Arrange a site visit today</h2>
          <p className="mx-auto mt-6 max-w-xl text-white/80">{COPY}</p>
          <a href={`${BASE}/contact/`} className="btn mt-10">Contact Us <Arrow /></a>
        </section>

        {/* CASE STUDIES */}
        <section className="bg-midnight pb-24 text-white">
          <div className="mx-auto mb-12 flex max-w-[1600px] flex-wrap items-end justify-between gap-6 px-6 xl:px-15">
            <h2 className="heading-lg">Case studies</h2>
            <a href={`${BASE}/case-studies/`} className="btn btn--outline">All Case Studies <Arrow /></a>
          </div>
          <div className="no-scrollbar flex snap-x gap-5 overflow-x-auto px-6 xl:px-15">
            {caseStudies.map((c) => (
              <a key={c.slug} href={`${BASE}/case-study/${c.slug}/`} className="group w-[80vw] shrink-0 snap-start md:w-[40vw] xl:w-[28vw]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={c.img} alt={c.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="mt-5 text-lg font-semibold group-hover:text-evergreen">{c.title}</h3>
              </a>
            ))}
          </div>
        </section>
        </>
        )}
      </main>

      <Footer />
      {SHOW_TEMPLATE && (
      <>
      {/* FOOTER */}
      <div className="h-6 bg-evergreen" />
      <footer className="bg-midnight pt-16 pb-10 text-white">
        <div className="mx-auto max-w-[1600px] px-6 xl:px-15">
          <div className="grid gap-12 xl:grid-cols-12">
            <div className="xl:col-span-3">
              <a href={`${BASE}/`}>
                <img src={`${UP}/2024/12/sis-footer-logo.svg`} alt="SIS Pitches" className="h-10" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-10 md:grid-cols-3 xl:col-span-9 xl:grid-cols-6">
              {footerCols.map((col) => (
                <nav key={col.title}>
                  <h4 className="mb-4 text-sm font-bold uppercase tracking-wide">{col.title}</h4>
                  <ul className="space-y-2 text-sm text-white/70">
                    {col.links.map(([label, href]) => (
                      <li key={href}><a href={`${BASE}${href}`} className="hover:text-evergreen">{label}</a></li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>
          <div className="mt-16 flex flex-wrap items-center gap-8 border-t border-white/15 pt-10">
            {accreditations.map((src) => (
              <img key={src} src={src} alt="" className="h-10 w-auto object-contain opacity-80" />
            ))}
          </div>
          <p className="mt-10 text-xs text-white/50">© {new Date().getFullYear()} SIS Pitches</p>
        </div>
      </footer>
      </>
      )}
    </>
  );
}
