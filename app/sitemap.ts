import type { MetadataRoute } from "next";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { articles, jobs } from "@/db/schema";
import { countryData } from "@/lib/jobs";

const base = "https://tawteenjobs.com";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "daily", priority: 1 },
    { url: `${base}/jobs`, changeFrequency: "hourly", priority: 0.9 },
    { url: `${base}/companies`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/salaries`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/articles`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/en`, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/en/jobs`, changeFrequency: "daily", priority: 0.7 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookies`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.4 },
    ...Object.keys(countryData).map((slug) => ({
      url: `${base}/countries/${slug}`,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
  ];

  try {
    const db = getDb();
    const [publishedJobs, publishedArticles] = await Promise.all([
      db.select({ slug: jobs.slug, updatedAt: jobs.updatedAt }).from(jobs).where(eq(jobs.status, "published")),
      db.select({ slug: articles.slug, updatedAt: articles.updatedAt }).from(articles).where(eq(articles.status, "published")),
    ]);

    return [
      ...staticPages,
      ...publishedJobs.map((job) => ({
        url: `${base}/jobs/${job.slug}`,
        lastModified: new Date(job.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
      ...publishedArticles.map((article) => ({
        url: `${base}/articles/${article.slug}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];
  } catch {
    return staticPages;
  }
}
