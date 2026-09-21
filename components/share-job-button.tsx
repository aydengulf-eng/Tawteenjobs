"use client";
import { useState } from "react";
import { Share2 } from "lucide-react";
export function ShareJobButton({title}:{title:string}){const[copied,setCopied]=useState(false);async function share(){const data={title,text:`${title} | توطين للوظائف`,url:window.location.href};try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(window.location.href);setCopied(true);setTimeout(()=>setCopied(false),2000)}}catch{}}return <button type="button" onClick={share} className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border font-black text-slate-600"><Share2 className="h-4 w-4"/>{copied?"تم نسخ الرابط":"مشاركة الوظيفة"}</button>}
