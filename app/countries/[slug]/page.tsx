import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { countryData } from "@/lib/jobs";
import type { Job } from "@/lib/jobs";
import { countryKey, getPublishedJobs } from "@/lib/live-jobs";

export const dynamic = "force-dynamic";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const country=countryData[slug];if(!country)return{title:"الدولة غير موجودة",robots:{index:false,follow:false}};return{title:`وظائف ${country.name}`,description:country.blurb,alternates:{canonical:`/countries/${slug}`}}}

export default async function CountryPage({params}:{params:Promise<{slug:string}>}) { const {slug}=await params; const country=countryData[slug]; if(!country) notFound(); let found:Job[]=[]; try{const all=await getPublishedJobs();found=all.filter(j=>countryKey(j.country)===countryKey(country.name));}catch{}
return <main dir="rtl" className="min-h-screen bg-[#f5f8fa]"><SiteHeader/><section className="hero-shell py-14 text-white"><div className="container-shell"><span className="flex items-center gap-2 text-[#dfc27f]"><MapPin/>وظائف حسب الدولة</span><h1 className="mt-3 text-4xl font-black">وظائف {country.name}</h1><p className="mt-3 text-lg text-slate-300">{country.blurb}</p></div></section><section className="container-shell py-10"><h2 className="text-2xl font-black">أحدث الفرص في {country.name}</h2><div className="mt-6 grid gap-4">{found.length?found.map(j=><a key={j.slug} href={`/jobs/${j.slug}`} className="job-card"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#00a67e] font-black text-white">{j.initials}</div><div><h3 className="text-lg font-black">{j.title}</h3><p className="mt-1 font-bold text-slate-500">{j.company} • {j.city}</p><p className="mt-3 text-sm font-bold text-[#009b78]">{j.type} • {j.mode}</p></div></a>):<div className="rounded-2xl border border-dashed bg-white p-10 text-center text-slate-500">ستضاف فرص جديدة لهذه الدولة قريباً.</div>}</div></section></main>; }
