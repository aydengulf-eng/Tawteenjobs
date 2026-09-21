import { desc, eq } from "drizzle-orm";
import { BriefcaseBusiness, MapPin } from "lucide-react";
import { getDb } from "@/db";
import { jobs } from "@/db/schema";

export const dynamic="force-dynamic";
export const metadata={title:"Gulf Jobs | Tawteen Jobs",description:"Browse current jobs across GCC countries.",alternates:{canonical:"/en/jobs",languages:{ar:"/jobs",en:"/en/jobs"}}};
const countryEn:Record<string,string>={"السعودية":"Saudi Arabia","المملكة العربية السعودية":"Saudi Arabia","الإمارات":"United Arab Emirates","الإمارات العربية المتحدة":"United Arab Emirates","قطر":"Qatar","الكويت":"Kuwait","عُمان":"Oman","عمان":"Oman","البحرين":"Bahrain"};
type Row=typeof jobs.$inferSelect;

export default async function EnglishJobs(){
  let rows:Row[]=[];
  try{rows=await getDb().select().from(jobs).where(eq(jobs.status,"published")).orderBy(desc(jobs.publishedAt),desc(jobs.createdAt));}catch{}
  const translated=rows.filter((j)=>j.titleEn.trim().length>0);
  return <main dir="ltr" className="min-h-screen bg-[#f5f8fa]"><header className="border-b bg-white"><div className="container-shell flex h-20 items-center justify-between"><a href="/en" className="text-xl font-black">Tawteen Jobs</a><a href="/jobs" className="font-black text-[#008f6c]">العربية</a></div></header><section className="bg-[#071a2e] py-12 text-white"><div className="container-shell"><h1 className="text-4xl font-black">Jobs across the Gulf</h1><p className="mt-3 text-slate-300">Explore current roles from verified employers.</p></div></section><section className="container-shell grid gap-4 py-10">{translated.length?translated.map(j=><a href={`/jobs/${j.slug}`} key={j.slug} className="job-card"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#00a67e] font-black text-white">{j.company.split(/\s+/).map(x=>x[0]).join("").slice(0,2)}</div><div><h2 className="text-lg font-black">{j.titleEn}</h2><p className="mt-1 font-bold text-slate-500">{j.company}</p><div className="mt-3 flex flex-wrap gap-4 text-sm font-bold text-slate-500"><span className="flex gap-1"><MapPin className="h-4 w-4"/>{j.city}, {countryEn[j.country]??j.country}</span><span className="flex gap-1"><BriefcaseBusiness className="h-4 w-4"/>{j.employmentType}</span></div></div></a>):<div className="rounded-2xl border border-dashed bg-white p-10 text-center text-slate-500"><h2 className="font-black text-[#071a2e]">English listings are being prepared</h2><p className="mt-2">Use the Arabic jobs page to view all currently published opportunities.</p><a href="/jobs" className="mt-5 inline-flex rounded-xl bg-[#008f6c] px-5 py-3 font-black text-white">View all jobs</a></div>}</section></main>
}
