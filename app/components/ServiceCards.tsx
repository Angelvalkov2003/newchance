import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "../data/site";

export default function ServiceCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {SERVICES.map((s, i) => (
        <Link key={s.slug} href={`/services/${s.slug}`} className="group relative aspect-[4/3] overflow-hidden bg-midnight text-white">
          <Image src={s.img.src} alt="" fill sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: s.img.pos }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <span className="absolute top-5 left-5 font-display text-sm font-semibold text-evergreen">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="absolute inset-x-5 bottom-5">
            <h3 className="heading-md">{s.title}</h3>
            <p className="mt-2 text-sm text-white/80">{s.short}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
