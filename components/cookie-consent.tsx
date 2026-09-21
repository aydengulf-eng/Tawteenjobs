"use client";
import { useEffect, useState } from "react";
export function CookieConsent(){
  const[visible,setVisible]=useState(false);
  useEffect(()=>{const timer=setTimeout(()=>setVisible(!localStorage.getItem("tawteen-cookie-choice")),0);return()=>clearTimeout(timer)},[]);
  if(!visible)return null;
  const english=window.location.pathname.startsWith("/en");
  const choose=(value:"necessary"|"accepted")=>{localStorage.setItem("tawteen-cookie-choice",value);setVisible(false);};
  return <aside className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl" dir={english?"ltr":"rtl"} role="dialog" aria-label={english?"Cookie choices":"خيارات ملفات الارتباط"}><p className="font-black text-[#071a2e]">{english?"Your privacy matters":"خصوصيتك مهمة"}</p><p className="mt-1 text-sm leading-6 text-slate-600">{english?"We use necessary cookies to operate the website. Analytics or advertising cookies will not be activated without your consent.":"نستخدم الملفات الضرورية لتشغيل الموقع. لن تُفعّل ملفات التحليل أو الإعلانات إلا بعد موافقتك."}</p><div className="mt-4 flex flex-wrap gap-2"><button onClick={()=>choose("accepted")} className="rounded-xl bg-[#008f6c] px-5 py-2.5 font-black text-white">{english?"Accept":"موافق"}</button><button onClick={()=>choose("necessary")} className="rounded-xl border px-5 py-2.5 font-black text-slate-700">{english?"Necessary only":"الضرورية فقط"}</button><a href={english?"/en/privacy":"/cookies"} className="px-3 py-2.5 text-sm font-black text-[#008f6c]">{english?"Details":"التفاصيل"}</a></div></aside>
}
