"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Bell, Bookmark, BriefcaseBusiness, Building2, ChevronDown, Clock3, MapPin, Menu, Search, ShieldCheck, Sparkles, TrendingUp, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const countries = [
  { name: "السعودية", code: "SA", tint: "from-emerald-500/15 to-emerald-500/5" },
  { name: "الإمارات", code: "AE", tint: "from-rose-500/15 to-rose-500/5" },
  { name: "قطر", code: "QA", tint: "from-purple-500/15 to-purple-500/5" },
  { name: "الكويت", code: "KW", tint: "from-sky-500/15 to-sky-500/5" },
  { name: "عُمان", code: "OM", tint: "from-red-500/15 to-red-500/5" },
  { name: "البحرين", code: "BH", tint: "from-orange-500/15 to-orange-500/5" },
];

type HomeJob = { slug:string; title:string; company:string; city:string; country:string; type:string; mode:string; age:string; badge:string; initials:string; color:string };
type HomeArticle = { slug:string; title:string; category:string; excerpt:string; imageUrl:string; readTime:string };

const specialties = [
  { label: "تقنية", icon: BriefcaseBusiness },
  { label: "المبيعات", icon: TrendingUp },
  { label: "المالية", icon: Building2 },
  { label: "الموارد البشرية", icon: Users },
];

function Brand({ inverse = false }: { inverse?: boolean }) {
  return <a href="#" className="group flex items-center gap-3" aria-label="توطين للوظائف - الرئيسية">
    <span className="brand-mark" aria-hidden="true"><span>ت</span></span>
    <span className="leading-none"><span className={`block text-[1.45rem] font-black tracking-tight ${inverse ? "text-white" : "text-[#071a2e]"}`}>توطين</span><span className={`mt-1 block text-[0.68rem] font-bold tracking-[0.16em] ${inverse ? "text-white/55" : "text-[#607080]"}`}>TAWTEEN JOBS</span></span>
  </a>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("all");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [jobs, setJobs] = useState<HomeJob[]>([]);
  const [articles, setArticles] = useState<HomeArticle[]>([]);
  useEffect(() => {
    fetch("/api/jobs").then(r=>r.json()).then((data:{jobs?:Record<string,unknown>[]})=>setJobs((data.jobs??[]).map((row)=>({
      slug:String(row.slug??""),title:String(row.titleAr??""),company:String(row.company??""),city:String(row.city??""),country:String(row.country??""),type:String(row.employmentType??""),mode:String(row.workMode??""),age:"حديثاً",badge:row.featured?"مميزة":"جديدة",initials:String(row.company??"").split(/\s+/).map(x=>x[0]).join("").slice(0,2).toUpperCase(),color:"bg-[#0c9b78]"
    })))).catch(()=>{});
    fetch("/api/articles").then(r=>r.json()).then((data:{articles?:HomeArticle[]})=>setArticles(data.articles??[])).catch(()=>{});
  }, []);
  const companyCount = useMemo(() => new Set(jobs.map(j=>j.company)).size, [jobs]);
  const countryCount = (name:string) => jobs.filter(j=>j.country===name || (name==="عُمان"&&j.country==="عمان")).length;
  const specialtyCount = (label:string) => jobs.filter(j=>`${j.title}`.includes(label)).length;
  const shownJobs = useMemo(() => jobs.filter((job) => {
    const text = `${job.title} ${job.company} ${job.city}`;
    return (!submittedQuery || text.includes(submittedQuery)) && (country === "all" || job.country === country);
  }), [jobs, submittedQuery, country]);

  function runSearch(event: React.FormEvent) {
    event.preventDefault();
    setSubmittedQuery(query.trim());
    document.getElementById("latest-jobs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function toggleSaved(title: string) {
    setSaved((current) => current.includes(title) ? current.filter((item) => item !== title) : [...current, title]);
  }

  return <main dir="rtl" className="min-h-screen overflow-hidden bg-[#f5f8fa] text-[#10263a]">
    <div className="topline"><div className="container-shell flex items-center justify-between py-2 text-[0.76rem] font-semibold text-white/75"><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#d6b267]" /> فرص موثوقة من شركات الخليج</span><span className="hidden sm:block">منصة عربية • 6 دول خليجية • فرص تُحدّث يومياً</span></div></div>

    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="container-shell flex h-[82px] items-center justify-between gap-6">
        <Brand />
        <nav className="hidden items-center gap-7 text-[0.92rem] font-bold text-[#31485d] xl:flex" aria-label="التنقل الرئيسي">
          <a className="nav-active" href="/">الرئيسية</a><a className="hover:text-[#009b78]" href="/jobs">الوظائف</a><a className="flex items-center gap-1 hover:text-[#009b78]" href="#countries">الدول <ChevronDown className="h-3.5 w-3.5" /></a><a className="hover:text-[#009b78]" href="#specialties">التخصصات</a><a className="hover:text-[#009b78]" href="/companies">الشركات</a><a className="hover:text-[#009b78]" href="/salaries">الرواتب</a><a className="hover:text-[#009b78]" href="/articles">دليل التوظيف</a>
        </nav>
        <div className="hidden items-center gap-3 md:flex"><button className="rounded-lg px-3 py-2 text-sm font-extrabold text-[#526779] hover:bg-slate-100">English</button><Button className="h-11 rounded-xl bg-[#071a2e] px-5 font-extrabold text-white hover:bg-[#0e2c48]">أعلن عن وظيفة</Button></div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white xl:hidden" aria-label="فتح القائمة">{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && <nav className="container-shell grid gap-1 border-t border-slate-100 py-4 text-sm font-bold xl:hidden">{[["الرئيسية","/"],["الوظائف","/jobs"],["الدول","/#countries"],["التخصصات","/#specialties"],["الشركات","/companies"],["الرواتب","/salaries"],["دليل التوظيف","/articles"],["English","/en"]].map(([item,href]) => <a key={item} className="rounded-lg px-3 py-3 hover:bg-emerald-50" href={href} onClick={() => setMenuOpen(false)}>{item}</a>)}</nav>}
    </header>

    <section className="hero-shell relative">
      <div className="hero-grid" aria-hidden="true" /><div className="gold-orbit" aria-hidden="true" />
      <div className="container-shell relative z-10 py-16 md:py-24"><div className="mx-auto max-w-4xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-bold text-[#e8cf96] backdrop-blur-sm"><Sparkles className="h-4 w-4" /> فرص مهنية تصنع مستقبلك في الخليج</div>
        <h1 className="text-balance text-[2.5rem] font-black leading-[1.22] tracking-tight text-white sm:text-5xl md:text-[4.2rem]">وظيفتك القادمة في الخليج<br /><span className="gold-text">تبدأ من هنا</span></h1>
        <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-8 text-slate-300 md:text-lg">اكتشف أحدث الوظائف وفرص التوطين من شركات موثوقة في السعودية والإمارات وجميع دول الخليج.</p>
        <form onSubmit={runSearch} className="search-panel mx-auto mt-9 grid max-w-4xl gap-3 p-3 md:grid-cols-[1.5fr_1fr_auto]" aria-label="البحث عن وظيفة">
          <label className="flex h-14 items-center gap-3 rounded-xl bg-[#f7f9fa] px-4 text-right"><Search className="h-5 w-5 shrink-0 text-[#00a67e]" /><span className="sr-only">المسمى الوظيفي أو الشركة</span><input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-transparent text-base font-semibold text-[#183148] outline-none placeholder:text-slate-400" placeholder="المسمى الوظيفي أو الشركة" /></label>
          <Select value={country} onValueChange={setCountry}><SelectTrigger className="h-14 w-full rounded-xl border-0 bg-[#f7f9fa] px-4 text-base font-bold text-[#183148] shadow-none"><span className="flex items-center gap-2"><MapPin className="h-5 w-5 text-[#00a67e]" /><SelectValue placeholder="كل دول الخليج" /></span></SelectTrigger><SelectContent dir="rtl"><SelectItem value="all">كل دول الخليج</SelectItem>{countries.map((item) => <SelectItem key={item.code} value={item.name}>{item.name}</SelectItem>)}</SelectContent></Select>
          <Button type="submit" className="h-14 rounded-xl bg-[#00a67e] px-8 text-base font-black text-white shadow-[0_10px_28px_rgba(0,166,126,.3)] hover:bg-[#008f6c]">ابحث الآن</Button>
        </form>
        <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-slate-400"><span>الأكثر بحثاً:</span><a href="#latest-jobs" className="text-white/80 hover:text-white">وظائف إدارية</a><a href="#latest-jobs" className="text-white/80 hover:text-white">تقنية المعلومات</a><a href="#latest-jobs" className="text-white/80 hover:text-white">حديثو التخرج</a></div>
      </div></div>
      <div className="container-shell relative z-20 pb-8"><div className="stats-card grid grid-cols-2 divide-x-reverse divide-x divide-slate-100 md:grid-cols-4">{[{n:String(jobs.length),t:"وظيفة متاحة"},{n:String(companyCount),t:"شركة توظف"},{n:"6",t:"دول خليجية"},{n:"يومياً",t:"تحديث الوظائف"}].map((stat) => <div className="px-3 py-4 text-center sm:py-6" key={stat.t}><strong className="block text-xl font-black text-[#071a2e] sm:text-3xl">{stat.n}</strong><span className="mt-1 block text-xs font-bold text-slate-500 sm:text-sm">{stat.t}</span></div>)}</div></div>
    </section>

    <section id="countries" className="container-shell scroll-mt-28 py-14"><SectionHeading eyebrow="اكتشف الفرص حولك" title="تصفح الوظائف حسب الدولة" action="عرض جميع الدول" href="/jobs" /><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">{countries.map((item) => <a key={item.code} href={`/jobs?country=${encodeURIComponent(item.name)}`} className={`country-card group bg-gradient-to-br ${item.tint}`}><span className="country-code">{item.code}</span><strong>{item.name}</strong><small>{countryCount(item.name)} وظيفة</small><ArrowLeft className="mt-4 h-4 w-4 text-[#00a67e] opacity-0 transition group-hover:opacity-100" /></a>)}</div></section>

    <section id="latest-jobs" className="container-shell scroll-mt-28 py-14">
      <SectionHeading eyebrow="فرص مختارة بعناية" title={submittedQuery || country !== "all" ? `نتائج البحث (${shownJobs.length})` : "أحدث الوظائف"} action="عرض جميع الوظائف" />
      <div className="mt-8 grid gap-4 lg:grid-cols-2">{shownJobs.length ? shownJobs.slice(0,6).map((job) => <a href={`/jobs/${job.slug}`} key={job.slug} className="job-card group">
        <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${job.color} text-sm font-black tracking-wider text-white shadow-sm`}>{job.initials}</div>
        <div className="min-w-0 flex-1"><div className="flex flex-wrap items-start justify-between gap-2"><div><span className={`mb-2 inline-block rounded-full px-2.5 py-1 text-[0.7rem] font-black ${job.badge === "مميزة" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>{job.badge}</span><h3 className="text-lg font-black text-[#0b2135] transition group-hover:text-[#009b78]">{job.title}</h3></div><button onClick={() => toggleSaved(job.title)} className={`grid h-10 w-10 place-items-center rounded-xl border transition ${saved.includes(job.title) ? "border-[#00a67e] bg-emerald-50 text-[#00a67e]" : "border-slate-200 text-slate-400 hover:border-[#00a67e] hover:text-[#00a67e]"}`} aria-label={`حفظ وظيفة ${job.title}`}><Bookmark className={`h-4 w-4 ${saved.includes(job.title) ? "fill-current" : ""}`} /></button></div>
        <p className="mt-2 text-sm font-bold text-slate-500">{job.company}</p><div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[0.78rem] font-bold text-slate-500"><span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#00a67e]" />{job.city}، {job.country}</span><span>{job.type}</span><span>{job.mode}</span><span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" />{job.age}</span></div></div>
      </a>) : <div className="col-span-2 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><Search className="mx-auto h-8 w-8 text-slate-300" /><h3 className="mt-3 font-black">لا توجد نتائج مطابقة حالياً</h3><p className="mt-1 text-sm text-slate-500">جرّب مسمى وظيفياً آخر أو اختر كل دول الخليج.</p></div>}</div>
    </section>

    <section id="specialties" className="border-y border-slate-200 bg-white py-16"><div className="container-shell"><SectionHeading eyebrow="اختر مسارك" title="تخصصات مطلوبة في سوق الخليج" action="كل التخصصات" href="/jobs" /><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{specialties.map(({label,icon:Icon}) => <a key={label} href={`/jobs?q=${encodeURIComponent(label)}`} className="specialty-card"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e8f8f3] text-[#008f6c]"><Icon className="h-5 w-5" /></span><div><strong className="block text-base font-black text-[#0b2135]">{label}</strong><small className="mt-1 block font-bold text-slate-400">{specialtyCount(label)} وظيفة</small></div><ArrowLeft className="mr-auto h-4 w-4 text-slate-300" /></a>)}</div></div></section>

    {articles.length>0&&<section className="container-shell py-16"><SectionHeading eyebrow="نصائح مهنية" title="أحدث المقالات" action="عرض كل المقالات" href="/articles"/><div className="mt-8 grid gap-5 md:grid-cols-3">{articles.slice(0,3).map(article=><a key={article.slug} href={`/articles/${article.slug}`} className="overflow-hidden rounded-2xl border bg-white shadow-sm"><img src={article.imageUrl} alt={article.title} className="h-44 w-full object-cover" loading="lazy"/><div className="p-5"><span className="text-xs font-black text-[#009b78]">{article.category}</span><h3 className="mt-2 text-lg font-black leading-7 text-[#071a2e]">{article.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{article.excerpt}</p><small className="mt-4 block font-bold text-slate-400">{article.readTime}</small></div></a>)}</div></section>}

    <section className="container-shell py-16 md:py-20"><div className="cta-panel relative overflow-hidden rounded-[2rem] px-6 py-10 md:px-12 md:py-12"><div className="cta-rings" aria-hidden="true" /><div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_auto]"><div className="flex items-start gap-4"><span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10 text-[#e5c77f]"><Bell className="h-6 w-6" /></span><div><h2 className="text-2xl font-black text-white md:text-3xl">لا تفوّت الفرصة المناسبة</h2><p className="mt-2 max-w-2xl font-medium leading-7 text-slate-300">سجّل اهتمامك وتوصّل بتنبيهات الوظائف الجديدة حسب تخصصك والدولة التي تختارها.</p></div></div><Button asChild className="h-12 rounded-xl bg-[#d1ad62] px-7 font-black text-[#071a2e] hover:bg-[#e0c27f]"><a href="/alerts">فعّل تنبيهات الوظائف</a></Button></div></div></section>

    <footer className="bg-[#061523] py-10 text-white"><div className="container-shell flex flex-col items-start justify-between gap-7 md:flex-row md:items-center"><Brand inverse /><p className="max-w-lg text-sm font-medium leading-7 text-slate-400">منصة عربية تجمع الباحثين عن فرص مهنية مميزة مع شركات موثوقة في جميع دول الخليج.</p><div className="flex flex-wrap gap-5 text-sm font-bold text-white/70"><a href="/privacy">الخصوصية</a><a href="/terms">الشروط</a><a href="/cookies">ملفات الارتباط</a><a href="/contact">تواصل معنا</a></div></div></footer>
  </main>;
}

function SectionHeading({ eyebrow, title, action, href="/jobs" }: { eyebrow: string; title: string; action: string; href?:string }) {
  return <div className="flex items-end justify-between gap-4"><div><p className="mb-2 text-sm font-black text-[#009b78]">{eyebrow}</p><h2 className="text-2xl font-black tracking-tight text-[#071a2e] sm:text-3xl">{title}</h2></div><a href={href} className="hidden items-center gap-2 text-sm font-black text-[#526779] hover:text-[#009b78] sm:flex">{action}<ArrowLeft className="h-4 w-4" /></a></div>;
}
