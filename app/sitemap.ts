import type { MetadataRoute } from "next";
import { SERVICES, SITE_URL } from "./data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/projects", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const services = SERVICES.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...services];
}
