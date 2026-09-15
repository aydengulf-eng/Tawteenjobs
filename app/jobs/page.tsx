import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { jobs as jobsTable } from "@/db/schema";
import { jobs as demoJobs, type Job } from "@/lib/jobs";
import { JobsClient } from "./jobs-client";

export const dynamic = "force-dynamic";

export default async function JobsPage({searchParams}:{searchParams:Promise<{country?:string;q?:string;company?:string}>}) {
  const params=await searchParams;
  let liveJobs: Job[] = [];
  try {
    const rows = await getDb().select().from(jobsTable)
      .where(eq(jobsTable.status, "published"))
      .orderBy(desc(jobsTable.publishedAt), desc(jobsTable.createdAt));
    liveJobs = rows.map((row) => ({
      slug: row.slug, title: row.titleAr, company: row.company,
      city: row.city, country: row.country, type: row.employmentType,
      mode: row.workMode, age: "حديثاً",
      badge: row.featured ? "مميزة" : "جديدة",
      initials: row.company.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase(),
      category: row.category, salary: row.salary, applyUrl: row.applyUrl,
      description: row.descriptionAr,
      requirements: JSON.parse(row.requirementsAr || "[]") as string[],
    }));
  } catch {}
  return <JobsClient initialJobs={liveJobs.length ? liveJobs : demoJobs} initialQuery={params.company??params.q??""} initialCountry={params.country??"all"} />;
}
