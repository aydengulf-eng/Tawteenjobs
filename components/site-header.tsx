"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <><div className="topline"><div className="container-shell flex items-center justify-between py-2 text-xs font-semibold text-white/75"><span>فرص موثوقة من شركات الخليج</span><span className="hidden sm:block">العربية | English</span></div></div>
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl"><div className="container-shell flex h-[78px] items-center justify-between gap-6">
      <a href="/" className="flex items-center gap-3"><span className="brand-mark"><span>ت</span></span><span className="leading-none"><strong className="block text-2xl font-black text-[#071a2e]">توطين</strong><small className="mt-1 block font-bold tracking-[.14em] text-slate-500">TAWTEEN JOBS</small></span></a>
      <nav className="hidden items-center gap-7 text-sm font-black text-slate-600 lg:flex"><a href="/">الرئيسية</a><a href="/jobs">الوظائف</a><a href="/countries/saudi-arabia">الدول</a><a href="/#specialties">التخصصات</a><a href="/companies">الشركات</a><a href="/salaries">الرواتب</a><a href="/articles">دليل التوظيف</a></nav>
      <div className="hidden items-center gap-3 md:flex"><a href="/en" className="px-3 text-sm font-black text-slate-500">English</a><Button asChild className="h-11 rounded-xl bg-[#071a2e] font-black"><a href="/admin">أعلن عن وظيفة</a></Button></div>
      <button onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 lg:hidden" aria-label="القائمة">{open ? <X /> : <Menu />}</button>
    </div>{open && <nav className="container-shell grid gap-1 border-t py-4 text-sm font-black lg:hidden">{["الرئيسية","الوظائف","السعودية","الإمارات","الشركات","الرواتب","English"].map((x)=><a key={x} className="rounded-lg px-3 py-3 hover:bg-emerald-50" href={x==="الرئيسية"?"/":x==="الوظائف"?"/jobs":"#"}>{x}</a>)}</nav>}</header></>;
}
