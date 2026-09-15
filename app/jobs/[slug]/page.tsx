import { notFound } from "next/navigation";
import { BriefcaseBusiness, CheckCircle2, Clock3, MapPin, Share2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { jobs } from "@/lib/jobs";
import { Button } from "@/components/ui/button";

export async function generateMetadata({params}:{params:Promise<{slug:string}>}) { const {slug}=await params; const job=jobs.find(j=>j.slug===slug); return {title:job?`${job.title} في ${job.city} | توطين`:"الوظيفة غير موجودة",description:job?.description}; }
export default async function JobDetail({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const job=jobs.find(j=>j.slug===slug); if(!job) notFound();
  return <main dir="rtl" className="min-h-screen bg-[#f5f8fa]"><SiteHeader />
    <section className="border-b bg-white py-9"><div className="container-shell"><a href="/jobs" className="text-sm font-black text-[#009b78]">الوظائف ←</a><div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center"><div className="grid h-20 w-20 place-items-center rounded-3xl bg-[#00a67e] text-lg font-black text-white">{job.initials}</div><div><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">{job.badge}</span><h1 className="mt-3 text-3xl font-black text-[#071a2e]">{job.title}</h1><p className="mt-2 font-bold text-slate-500">{job.company}</p></div></div></div></section>
    <div className="container-shell grid gap-7 py-9 lg:grid-cols-[1fr_330px]"><article className="rounded-2xl border bg-white p-6 md:p-8"><h2 className="text-xl font-black">نبذة عن الوظيفة</h2><p className="mt-4 leading-8 text-slate-600">{job.description}</p><h2 className="mt-8 text-xl font-black">المتطلبات</h2><ul className="mt-4 grid gap-3">{job.requirements.map(x=><li key={x} className="flex gap-2 text-slate-600"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#00a67e]"/>{x}</li>)}</ul><h2 className="mt-8 text-xl font-black">المهام والمسؤوليات</h2><p className="mt-4 leading-8 text-slate-600">المساهمة في تحقيق أهداف الفريق، إعداد التقارير الدورية، والتعاون مع الإدارات المعنية لضمان جودة النتائج.</p></article>
      <aside className="h-fit rounded-2xl border bg-white p-6 lg:sticky lg:top-28"><div className="grid gap-4 text-sm font-bold text-slate-600"><span className="flex items-center gap-2"><MapPin className="text-[#00a67e]"/>{job.city}، {job.country}</span><span className="flex items-center gap-2"><BriefcaseBusiness className="text-[#00a67e]"/>{job.type} • {job.mode}</span><span className="flex items-center gap-2"><Clock3 className="text-[#00a67e]"/>{job.age}</span></div><div className="my-5 border-t"/><p className="text-sm font-bold text-slate-500">الراتب المتوقع</p><strong className="mt-2 block text-lg font-black text-[#071a2e]">{job.salary}</strong><Button className="mt-6 h-12 w-full rounded-xl bg-[#00a67e] text-base font-black hover:bg-[#008f6c]">قدّم الآن</Button><button className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border font-black text-slate-600"><Share2 className="h-4 w-4"/>مشاركة الوظيفة</button></aside>
    </div>
  </main>;
}
