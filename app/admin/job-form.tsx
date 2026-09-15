"use client";
import { useState } from "react";
import { Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
export function JobForm(){
 const[status,setStatus]=useState("draft"),[message,setMessage]=useState(""),[busy,setBusy]=useState(false);
 async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setMessage("");const form=e.currentTarget;const body=Object.fromEntries(new FormData(form).entries());body.status=status;const res=await fetch("/api/admin/jobs",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)});const data=await res.json() as {error?:string};setMessage(res.ok?"تم حفظ الوظيفة بنجاح":data.error??"تعذر الحفظ");if(res.ok)form.reset();setBusy(false)}
 const field="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 outline-none focus:border-[#00a67e]";
 return <form onSubmit={submit} className="rounded-2xl border bg-white p-6"><h2 className="mb-6 flex items-center gap-2 text-xl font-black"><Plus className="text-[#00a67e]"/>إضافة وظيفة</h2><div className="grid gap-5 md:grid-cols-2">
 <label className="text-sm font-black">المسمى الوظيفي<input name="titleAr" required className={field}/></label><label className="text-sm font-black">اسم الشركة<input name="company" required className={field}/></label>
 <label className="text-sm font-black">الدولة<input name="country" required className={field}/></label><label className="text-sm font-black">المدينة<input name="city" required className={field}/></label>
 <label className="text-sm font-black">التخصص<input name="category" required className={field}/></label><label className="text-sm font-black">الراتب<input name="salary" className={field} placeholder="اختياري"/></label>
 <label className="text-sm font-black">نمط العمل<NativeSelect name="workMode" className={field}><NativeSelectOption>حضوري</NativeSelectOption><NativeSelectOption>هجين</NativeSelectOption><NativeSelectOption>عن بُعد</NativeSelectOption></NativeSelect></label>
 <label className="text-sm font-black">نوع الدوام<NativeSelect name="employmentType" className={field}><NativeSelectOption>دوام كامل</NativeSelectOption><NativeSelectOption>دوام جزئي</NativeSelectOption><NativeSelectOption>عقد</NativeSelectOption><NativeSelectOption>تدريب</NativeSelectOption></NativeSelect></label>
 <label className="text-sm font-black md:col-span-2">رابط التقديم<input name="applyUrl" type="url" required className={field} placeholder="https://..."/></label>
 <label className="text-sm font-black md:col-span-2">وصف الوظيفة<textarea name="descriptionAr" required className="mt-2 min-h-36 w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-[#00a67e]"/></label></div>
 <div className="mt-6 flex flex-wrap items-center gap-3"><NativeSelect value={status} onChange={e=>setStatus(e.target.value)} className="h-11 w-44 rounded-xl border px-3"><NativeSelectOption value="draft">حفظ كمسودة</NativeSelectOption><NativeSelectOption value="published">نشر مباشرة</NativeSelectOption></NativeSelect><Button disabled={busy} className="h-11 rounded-xl bg-[#00a67e] px-6 font-black hover:bg-[#008f6c]"><Save/>{busy?"جارٍ الحفظ...":"حفظ الوظيفة"}</Button>{message&&<p className="text-sm font-black text-[#007b5f]">{message}</p>}</div></form>
}
