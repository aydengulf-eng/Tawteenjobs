import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { jobs as jobsTable } from "@/db/schema";
import type { Job } from "@/lib/jobs";

export async function getPublishedJobs(): Promise<Job[]> {
  const rows = await getDb().select().from(jobsTable)
    .where(eq(jobsTable.status, "published"))
    .orderBy(desc(jobsTable.publishedAt), desc(jobsTable.createdAt));
  return rows.map((row) => {
    let requirements: string[] = [];
    try { requirements = JSON.parse(row.requirementsAr || "[]") as string[]; } catch {}
    return { slug:row.slug,title:row.titleAr,company:row.company,city:row.city,country:row.country,type:row.employmentType,mode:row.workMode,age:"حديثاً",badge:row.featured?"مميزة":"جديدة",initials:row.company.split(/\s+/).map((part)=>part[0]).join("").slice(0,2).toUpperCase(),category:row.category,salary:row.salary,applyUrl:row.applyUrl,description:row.descriptionAr,requirements };
  });
}

export function countryKey(value: string) {
  const text=value.trim().toLowerCase().replace(/[أإآ]/g,"ا").replace(/ُ/g,"");
  if(text.includes("سعود")||text==="sa"||text.includes("saudi"))return"SA";
  if(text.includes("امارات")||text==="ae"||text==="uae"||text.includes("united arab emirates"))return"AE";
  if(text.includes("قطر")||text==="qa"||text.includes("qatar"))return"QA";
  if(text.includes("كويت")||text==="kw"||text.includes("kuwait"))return"KW";
  if(text.includes("عمان")||text==="om"||text.includes("oman"))return"OM";
  if(text.includes("بحرين")||text==="bh"||text.includes("bahrain"))return"BH";
  return text;
}
