"use client";

import { useState } from "react";

const BASE = "https://www.sispitches.com";
const UP = `${BASE}/wp-content/uploads`;

const services = [
  { tab: "Design", href: "/service/design/", imgs: ["2024/12/design1.jpg", "2024/12/design2.jpg"] },
  { tab: "Manufacture", href: "/service/manufacturing/", imgs: ["2024/12/manufacture2.jpg", "2025/01/manufacture2.jpg"] },
  { tab: "Construct", href: "/service/construction/", imgs: ["2024/12/construction1.jpg", "2025/01/construct2.jpg"] },
  { tab: "Surfacing", href: "/service/resurfacing/", imgs: ["2024/12/surfacing1.jpg", "2024/12/surfacing2.jpg"] },
  { tab: "Maintain", href: "/service/sis-plus-maintenance/", imgs: ["2024/12/maintain1.jpg", "2024/12/maintain2.jpg"] },
];

export default function Services({ copy }: { copy: string }) {
  const [active, setActive] = useState(-1); // -1 = Overview
  const current = active >= 0 ? services[active] : null;

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-[1600px] px-6 xl:px-15">
        <nav className="no-scrollbar mx-auto mb-16 flex max-w-max gap-2 overflow-x-auto border border-neutral-200 p-1">
          {["Overview", ...services.map((s) => s.tab)].map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setActive(i - 1)}
              className={`shrink-0 px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                active === i - 1 ? "bg-sis-purple text-white" : "hover:bg-neutral-100"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="heading-lg text-sis-purple">
              {current ? current.tab : "The entire project. From a single source."}
            </h2>
            <p className="mt-6 max-w-xl text-neutral-700">{copy}</p>
            {current && (
              <a href={`${BASE}${current.href}`} className="btn mt-10">
                Learn more
              </a>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {(current ? current.imgs : [services[0].imgs[0], services[2].imgs[0]]).map((p, i) => (
              <img
                key={p}
                src={`${UP}/${p}`}
                alt=""
                className={`aspect-[3/4] w-full object-cover ${i === 1 ? "mt-16" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
