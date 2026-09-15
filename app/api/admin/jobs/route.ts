import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { jobs } from "@/db/schema";
import { getChatGPTUser } from "@/app/chatgpt-auth";

async function authorized() { return Boolean(await getChatGPTUser()); }

export async function GET() {
  if (!(await authorized())) return Response.json({ error: "غير مصرح" }, { status: 401 });
  try { return Response.json({ jobs: await getDb().select().from(jobs).orderBy(desc(jobs.createdAt)).limit(100) }); }
  catch { return Response.json({ jobs: [], notice: "قاعدة البيانات جاهزة وستعمل بعد أول نشر." }); }
}

export async function POST(request: Request) {
  if (!(await authorized())) return Response.json({ error: "غير مصرح" }, { status: 401 });
  const body = await request.json() as Record<string, unknown>;
  const titleAr=String(body.titleAr??"").trim(), company=String(body.company??"").trim(), country=String(body.country??"").trim(), city=String(body.city??"").trim(), descriptionAr=String(body.descriptionAr??"").trim();
  if(!titleAr||!company||!country||!city||!descriptionAr) return Response.json({error:"جميع الحقول الأساسية مطلوبة"},{status:400});
  const slug=String(body.slug??titleAr).toLowerCase().trim().replace(/\s+/g,"-").replace(/[^\p{L}\p{N}-]/gu,"").slice(0,90);
  try {
    const existing=await getDb().select({id:jobs.id}).from(jobs).where(eq(jobs.slug,slug)).limit(1);
    if(existing.length) return Response.json({error:"هذه الوظيفة موجودة مسبقاً"},{status:409});
    const [created]=await getDb().insert(jobs).values({slug,titleAr,company,country,city,category:String(body.category??"عام"),employmentType:String(body.employmentType??"دوام كامل"),workMode:String(body.workMode??"حضوري"),salary:String(body.salary??""),descriptionAr,status:String(body.status??"draft"),publishedAt:body.status==="published"?new Date().toISOString():null}).returning();
    return Response.json({job:created},{status:201});
  } catch { return Response.json({error:"تعذر حفظ الوظيفة حالياً"},{status:500}); }
}
