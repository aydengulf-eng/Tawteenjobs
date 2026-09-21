import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { BriefcaseBusiness, CheckCircle2, Clock3, MapPin, Share2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import type { Job } from "@/lib/jobs";
import { getDb } from "@/db";
import { jobs as jobsTable } from "@/db/schema";

type JobDetail = Job & { publishedAt?: string; updatedAt?: string };

async function findJob(slug: string): Promise<JobDetail | undefined> {
  try {
    const [row] = await getDb()
      .select()
      .from(jobsTable)
      .where(and(eq(jobsTable.slug, slug), eq(jobsTable.status, "published")))
      .limit(1);

    if (row) {
      let requirements: string[] = [];
      try { requirements = JSON.parse(row.requirementsAr || "[]") as string[]; } catch {}
      return {
        slug: row.slug,
        title: row.titleAr,
        company: row.company,
        city: row.city,
        country: row.country,
        type: row.employmentType,
        mode: row.workMode,
        age: "حديثاً",
        badge: row.featured ? "مميزة" : "جديدة",
        initials: row.company.split(/\s+/).map((word) => word[0]).join("").slice(0, 2).toUpperCase(),
        category: row.category,
        salary: row.salary,
        applyUrl: row.applyUrl,
        description: row.descriptionAr,
        requirements,
        publishedAt: row.publishedAt ?? row.createdAt,
        updatedAt: row.updatedAt,
      };
    }
  } catch {}

  return undefined;
}

const countryCodes: Record<string, string> = {
  "السعودية": "SA",
  "المملكة العربية السعودية": "SA",
  "الإمارات": "AE",
  "الإمارات العربية المتحدة": "AE",
  "قطر": "QA",
  "الكويت": "KW",
  "البحرين": "BH",
  "عُمان": "OM",
  "عمان": "OM",
};

function employmentType(value: string) {
  if (value.includes("جزئي")) return "PART_TIME";
  if (value.includes("مؤقت")) return "TEMPORARY";
  if (value.includes("تدريب")) return "INTERN";
  if (value.includes("عقد")) return "CONTRACTOR";
  return "FULL_TIME";
}

function baseSalary(job:JobDetail){const values=job.salary.match(/[\d,]+/g)?.map(x=>Number(x.replace(/,/g,""))).filter(Number.isFinite)??[];if(!values.length)return undefined;const currencies:Record<string,string>={SA:"SAR",AE:"AED",QA:"QAR",KW:"KWD",OM:"OMR",BH:"BHD"};const code=countryCodes[job.country]??"";return{"@type":"MonetaryAmount",currency:currencies[code]??"SAR",value:{"@type":"QuantitativeValue",minValue:values[0],...(values[1]?{maxValue:values[1]}:{}),unitText:"MONTH"}}}

function jobPosting(job: JobDetail) {
  const datePosted = job.publishedAt ?? new Date().toISOString();
  const validThrough = new Date(new Date(datePosted).getTime() + 60 * 24 * 60 * 60 * 1000).toISOString();
  const remote = job.mode.includes("عن بعد") || job.mode.includes("Remote");
  const addressCountry = countryCodes[job.country] ?? job.country;

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: `${job.description}\n\nالمتطلبات:\n${job.requirements.join("\n")}`,
    identifier: { "@type": "PropertyValue", name: "Tawteen Jobs", value: job.slug },
    datePosted,
    validThrough,
    employmentType: employmentType(job.type),
    hiringOrganization: { "@type": "Organization", name: job.company },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: job.city, addressRegion: job.city, addressCountry },
    },
    ...(remote ? {
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: { "@type": "Country", name: job.country },
    } : {}),
    directApply: false,
    url: `https://tawteenjobs.com/jobs/${job.slug}`,
    ...(baseSalary(job)?{baseSalary:baseSalary(job)}:{}),
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await findJob(slug);
  if (!job) return { title: "الوظيفة غير موجودة", robots: { index: false, follow: false } };
  const title = `${job.title} في ${job.city}`;
  const description = job.description.slice(0, 160);
  return {
    title,
    description,
    alternates: { canonical: `/jobs/${job.slug}` },
    openGraph: { type: "article" as const, title, description, url: `/jobs/${job.slug}` },
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await findJob(slug);
  if (!job) notFound();
  const structuredData = JSON.stringify(jobPosting(job)).replace(/</g, "\\u003c");

  return <main dir="rtl" className="min-h-screen bg-[#f5f8fa]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
    <SiteHeader />
    <section className="border-b bg-white py-9"><div className="container-shell"><a href="/jobs" className="text-sm font-black text-[#009b78]">الوظائف ←</a><div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center"><div className="grid h-20 w-20 place-items-center rounded-3xl bg-[#00a67e] text-lg font-black text-white">{job.initials}</div><div><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">{job.badge}</span><h1 className="mt-3 text-3xl font-black text-[#071a2e]">{job.title}</h1><p className="mt-2 font-bold text-slate-500">{job.company}</p></div></div></div></section>
    <div className="container-shell grid gap-7 py-9 lg:grid-cols-[1fr_330px]"><article className="rounded-2xl border bg-white p-6 md:p-8"><h2 className="text-xl font-black">نبذة عن الوظيفة</h2><p className="mt-4 leading-8 text-slate-600">{job.description}</p><h2 className="mt-8 text-xl font-black">المتطلبات</h2><ul className="mt-4 grid gap-3">{job.requirements.map((requirement) => <li key={requirement} className="flex gap-2 text-slate-600"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#00a67e]" />{requirement}</li>)}</ul></article><aside className="h-fit rounded-2xl border bg-white p-6 lg:sticky lg:top-28"><div className="grid gap-4 text-sm font-bold text-slate-600"><span className="flex items-center gap-2"><MapPin className="text-[#00a67e]" />{job.city}، {job.country}</span><span className="flex items-center gap-2"><BriefcaseBusiness className="text-[#00a67e]" />{job.type} • {job.mode}</span><span className="flex items-center gap-2"><Clock3 className="text-[#00a67e]" />{job.age}</span></div><div className="my-5 border-t" /><p className="text-sm font-bold text-slate-500">الراتب المتوقع</p><strong className="mt-2 block text-lg font-black text-[#071a2e]">{job.salary || "غير محدد"}</strong>{job.applyUrl ? <Button asChild className="mt-6 h-12 w-full rounded-xl bg-[#00a67e] text-base font-black hover:bg-[#008f6c]"><a href={job.applyUrl} target="_blank" rel="noopener noreferrer">قدّم الآن</a></Button> : <Button disabled className="mt-6 h-12 w-full rounded-xl text-base font-black">رابط التقديم غير متوفر</Button>}<button className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border font-black text-slate-600"><Share2 className="h-4 w-4" />مشاركة الوظيفة</button></aside></div>
  </main>;
}
