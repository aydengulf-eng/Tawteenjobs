"use client";
import { useMemo, useState } from "react";
import { Bookmark, BriefcaseBusiness, Clock3, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import type { Job } from "@/lib/jobs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function JobsClient({initialJobs}:{initialJobs:Job[]}) {
  const [jobs]=useState<Job[]>(initialJobs);
  const [query,setQuery]=useState(""); const [country,setCountry]=useState("all"); const [category,setCategory]=useState("all");
  const filtered=useMemo(()=>jobs.filter(j=>(!query||`${j.title} ${j.company} ${j.city}`.includes(query))&&(country==="all"||j.country===country)&&(category==="all"||j.category===category)),[query,country,category]);
  return <main dir="rtl" className="min-h-screen bg-[#f5f8fa]"><SiteHeader />
    <section className="bg-[#071a2e] py-12 text-white"><div className="container-shell"><p className="text-sm font-black text-[#d7b66d]">فرص العمل في الخليج</p><h1 className="mt-2 text-3xl font-black md:text-4xl">ابحث عن وظيفتك المناسبة</h1><p className="mt-3 text-slate-300">صفِّ النتائج حسب الدولة والتخصص، ثم اطلع على تفاصيل كل فرصة.</p></div></section>
    <div className="container-shell grid gap-6 py-9 lg:grid-cols-[280px_1fr]">
      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-28"><h2 className="flex items-center gap-2 text-lg font-black"><SlidersHorizontal className="h-5 w-5 text-[#00a67e]"/>تصفية الوظائف</h2>
        <label className="mt-5 block text-sm font-black">كلمة البحث<input value={query} onChange={e=>setQuery(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-[#00a67e]" placeholder="مثال: محاسب" /></label>
        <label className="mt-4 block text-sm font-black">الدولة<Select value={country} onValueChange={setCountry}><SelectTrigger className="mt-2 h-12 w-full"><SelectValue /></SelectTrigger><SelectContent dir="rtl">{["all","السعودية","الإمارات","قطر","الكويت","عُمان","البحرين"].map(x=><SelectItem key={x} value={x}>{x==="all"?"كل الدول":x}</SelectItem>)}</SelectContent></Select></label>
        <label className="mt-4 block text-sm font-black">التخصص<Select value={category} onValueChange={setCategory}><SelectTrigger className="mt-2 h-12 w-full"><SelectValue /></SelectTrigger><SelectContent dir="rtl">{["all","التقنية والبرمجة","المبيعات والتسويق","المالية والمحاسبة","الموارد البشرية","خدمة العملاء"].map(x=><SelectItem key={x} value={x}>{x==="all"?"كل التخصصات":x}</SelectItem>)}</SelectContent></Select></label>
      </aside>
      <section><div className="mb-5 flex items-center justify-between"><div><h2 className="text-2xl font-black text-[#071a2e]">الوظائف المتاحة</h2><p className="mt-1 text-sm font-bold text-slate-500">{filtered.length} نتائج مطابقة</p></div><Search className="h-6 w-6 text-[#00a67e]"/></div>
        <div className="grid gap-4">{filtered.map(job=><a key={job.slug} href={`/jobs/${job.slug}`} className="job-card group"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#0c9b78] text-sm font-black text-white">{job.initials}</div><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700">{job.badge}</span><h3 className="mt-3 text-lg font-black text-[#071a2e] group-hover:text-[#009b78]">{job.title}</h3></div><Bookmark className="h-5 w-5 text-slate-300"/></div><p className="mt-1 font-bold text-slate-500">{job.company}</p><div className="mt-4 flex flex-wrap gap-4 text-sm font-bold text-slate-500"><span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-[#00a67e]"/>{job.city}، {job.country}</span><span className="flex items-center gap-1"><BriefcaseBusiness className="h-4 w-4"/>{job.type}</span><span className="flex items-center gap-1"><Clock3 className="h-4 w-4"/>{job.age}</span></div></div></a>)}</div>
      </section>
    </div>
  </main>;
}
