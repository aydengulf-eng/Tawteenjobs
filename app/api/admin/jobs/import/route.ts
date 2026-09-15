import { env } from "cloudflare:workers";
import { getDb } from "@/db";
import { jobs } from "@/db/schema";
import { getChatGPTUser } from "@/app/chatgpt-auth";
type ImportJob={slug?:string;titleAr?:string;titleEn?:string;company?:string;country?:string;city?:string;category?:string;employmentType?:string;workMode?:string;salary?:string;applyUrl?:string;descriptionAr?:string;requirementsAr?:string[];status?:string;featured?:boolean};
export async function POST(request:Request){
  if(!await getChatGPTUser())return Response.json({error:"غير مصرح"},{status:401});
  const configured=String((env as unknown as Record<string,unknown>).ADMIN_SECRET??"");
  if(!configured||request.headers.get("x-admin-secret")!==configured)return Response.json({error:"الكود السري غير صحيح"},{status:403});
  let input:unknown;try{input=await request.json()}catch{return Response.json({error:"JSON غير صالح"},{status:400})}
  if(!Array.isArray(input)||!input.length)return Response.json({error:"ألصق قائمة وظائف JSON"},{status:400});
  let added=0,skipped=0;
  for(const raw of input as ImportJob[]){
    if(!raw.titleAr||!raw.company||!raw.country||!raw.city||!raw.descriptionAr||!raw.applyUrl){skipped++;continue}
    const slug=(raw.slug??`${raw.titleAr}-${raw.company}-${raw.city}`).toLowerCase().trim().replace(/\s+/g,"-").replace(/[^\p{L}\p{N}-]/gu,"").slice(0,90);
    try{await getDb().insert(jobs).values({slug,titleAr:raw.titleAr,titleEn:raw.titleEn??"",company:raw.company,country:raw.country,city:raw.city,category:raw.category??"عام",employmentType:raw.employmentType??"دوام كامل",workMode:raw.workMode??"حضوري",salary:raw.salary??"",applyUrl:raw.applyUrl,descriptionAr:raw.descriptionAr,requirementsAr:JSON.stringify(raw.requirementsAr??[]),status:raw.status==="draft"?"draft":"published",featured:Boolean(raw.featured),publishedAt:raw.status==="draft"?null:new Date().toISOString()});added++}catch{skipped++}
  }
  return Response.json({added,skipped,total:input.length});
}
