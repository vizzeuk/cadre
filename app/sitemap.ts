import type { MetadataRoute } from "next";
import { client, sanityIsConfigured } from "@/sanity/lib/client";
import { allSlugsQuery } from "@/sanity/lib/queries";

const BASE_URL = "https://cadresolutions.cl";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  if (!sanityIsConfigured) return staticRoutes;

  const slugs: { slug: string }[] = await client.fetch(allSlugsQuery);

  const postRoutes: MetadataRoute.Sitemap = slugs.map(({ slug }) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
