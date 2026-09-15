"use client";
import { useState } from "react";
const sample=`[
  {
    "title": "عنوان المقال",
    "category": "السيرة الذاتية",
    "excerpt": "ملخص قصير للمقال.",
    "content": "مقدمة المقال\\n\\nالعنوان الأول\\nمحتوى الفقرة الأولى.",
    "imageUrl": "https://example.com/image.jpg",
    "readTime": "6 دقائق",
    "status": "published"
  }
]`;
export function ArticleImportForm(){const[secret,setSecret]=useState(""),[json,setJson]=useState(sample),[message,setMessage]=useState(""),[busy,setBusy]=useState(false);async function send(){setBusy(true);setMessage("");let parsed:unknown;try{parsed=JSON.parse(json)}catch{setMessage("JSON فيه خطأ");setBusy(false);return}const res=await fetch("/api/admin/articles/import",{method:"POST",headers:{"content-type":"application/json","x-admin-secret":secret},body:JSON.stringify(parsed)});const data=await res.json() as {error?:string;added?:number;skipped?:number};setMessage(res.ok?`تمت إضافة ${data.added} وتخطي ${data.skipped}`:data.error??"وقع خطأ");setBusy(false)}return <div className="rounded-2xl border bg-white p-6"><label className="block font-black">الكود السري<input type="password" value={secret} onChange={e=>setSecret(e.target.value)} className="mt-2 h-12 w-full rounded-xl border px-4"/></label><label className="mt-5 block font-black">المقالات JSON<textarea dir="ltr" value={json} onChange={e=>setJson(e.target.value)} className="mt-2 min-h-[450px] w-full rounded-xl border p-4 font-mono text-sm"/></label><div className="mt-5 flex items-center gap-4"><button onClick={send} disabled={busy||!secret} className="rounded-xl bg-[#00a67e] px-6 py-3 font-black text-white disabled:opacity-50">{busy?"جارٍ الاستيراد...":"استيراد المقالات"}</button>{message&&<p className="font-black text-[#007b5f]">{message}</p>}</div></div>}
