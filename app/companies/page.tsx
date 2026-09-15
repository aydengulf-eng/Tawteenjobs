import { desc, eq } from "drizzle-orm";
import { Building2, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { getDb } from "@/db";
import { jobs } from "@/db/schema";

export const dynamic = "force-dynamic";
export const metadata = { title: "الشركات التي توظف في الخليج", description: "اكتشف الشركات وفرص العمل المنشورة لديها في دول الخليج." };

export default async function Companies() {
  let rows: { company:string; city:string; country:string }[] = [];
  try {
    rows = await getDb().select({company:jobs.company,city:jobs.city,country:jobs.country}).from(jobs).where(eq(jobs.status,"published")).orderBy(desc(jobs.createdAt));
  } catch {}
  const grouped = new Map<string,{name:string;city:string;country:string;count:number}>();
  for (const row of rows) {
    const current=grouped.get(row.company);
    if(current) current.count++;
    else grouped.set(row.company,{name:row.company,city:row.city,country:row.country,count:1});
  }
  const companies=[...grouped.values()].sort((a,b)=>b.count-a.count);
  return <main dir="rtl" className="min-h-screen bg-[#f5f8fa]"><SiteHeader/><section className="hero-shell py-14 text-white"><div className="container-shell"><p className="font-black text-[#dfc27f]">دليل أصحاب العمل</p><h1 className="mt-2 text-4xl font-black">شركات توظف الآن</h1><p className="mt-3 text-slate-300">الشركات الظاهرة هنا مرتبطة بالوظائف المنشورة فعلياً على توطين.</p></div></section><section className="container-shell py-10">{companies.length?<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{companies.map(c=><article key={c.name} className="rounded-2xl border bg-white p-6 shadow-sm"><div className="flex items-center gap-4"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#071a2e] text-[#e2c47f]"><Building2/></div><div><h2 className="text-lg font-black">{c.name}</h2><p className="mt-1 text-sm font-bold text-slate-500">{c.country}</p></div></div><div className="my-5 border-t"/><div className="flex justify-between text-sm font-bold text-slate-500"><span className="flex gap-1"><MapPin className="h-4 w-4 text-[#00a67e]"/>{c.city}</span><span>{c.count} {c.count===1?"وظيفة":"وظائف"}</span></div><a href={`/jobs?company=${encodeURIComponent(c.name)}`} className="mt-5 flex h-11 items-center justify-center rounded-xl bg-emerald-50 font-black text-[#008f6c]">عرض الوظائف</a></article>)}</div>:<div className="rounded-2xl border bg-white p-10 text-center font-bold text-slate-500">لا توجد شركات منشورة حالياً.</div>}</section></main>;
}
